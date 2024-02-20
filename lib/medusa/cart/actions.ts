"use server";
import { getRegions } from "@/app/actions";
import { cookies } from "next/headers";
import { omit } from "lodash";
import { getMedusaHeaders } from "../utils";
import { medusaClient } from "../config";
import { StorePostCartReq } from "@medusajs/medusa/dist/api";
import { revalidateTag } from "next/cache";
import { Cart, LineItem } from "@medusajs/medusa/dist/models";
import { getProductsById } from "../products/actions";

const CART_RESPONSE = {
  NO_CARTID: "missingCart",
  NO_LINEID: "missingLineId",
  NO_VARIANT: "missingVariantId",
  ERROR_ADDING: "Error adding item to cart",
  SUCCESS: "success",
} as const;

type Keys = keyof typeof CART_RESPONSE;
export type CART_RESPONSE_VALUE = (typeof CART_RESPONSE)[Keys];

export async function createCart(data = {}) {
  const headers = getMedusaHeaders(["cart"]);
  return medusaClient.carts
    .create(data, headers)
    .then(({ cart }) => cart)
    .catch((e) => {
      console.log(e);
      return null;
    });
}

export async function updateCart(cartId: string, data: StorePostCartReq) {
  const headers = getMedusaHeaders(["cart"]);
  return medusaClient.carts
    .update(cartId, data, headers)
    .then(({ cart }) => cart)
    .catch((e) => {
      console.log(e);
      return null;
    });
}

export async function getCart(cartId: string) {
  const headers = getMedusaHeaders(["cart"]);
  return medusaClient.carts
    .retrieve(cartId, headers)
    .then(({ cart }) => cart)
    .catch((e) => {
      console.log(e);
      return null;
    });
}

export async function getOrSetCart(countryCode: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value;
  let cart;
  if (cartId) {
    cart = await getCart(cartId).then((res) => res);
  }

  const region = await getRegions(countryCode);
  if (!region) {
    return null;
  }
  const region_id = region.id;
  if (!cart) {
    cart = await createCart({ region_id }).then((res) => res);
    cart && cookies().set("_medusa_cart_id", cart.id);
    revalidateTag("cart");
  }
  if (cart && cart?.region_id !== region_id) {
    cart = await updateCart(cart.id, { region_id }).then((res) => res);
    revalidateTag("cart");
  }
  return cart;
}

export async function retrieveCart() {
  const cartId = cookies().get("_medusa_cart_id")?.value;
  if (!cartId) {
    return null;
  }
  try {
    const cart = await getCart(cartId);
    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function addItem({
  cartId,
  variantId,
  quantity,
}: {
  cartId: string;
  variantId: string;
  quantity: number;
}) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts.lineItems
    .create(cartId, { variant_id: variantId, quantity }, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string;
  quantity: number;
  countryCode: string;
}): Promise<CART_RESPONSE_VALUE> {
  const cart = await getOrSetCart(countryCode);
  if (!cart) {
    return CART_RESPONSE.NO_CARTID;
  }
  if (!variantId) {
    return CART_RESPONSE.NO_VARIANT;
  }
  try {
    await addItem({ cartId: cart.id, variantId, quantity });
    revalidateTag("cart");
    return CART_RESPONSE.SUCCESS;
  } catch (error) {
    return CART_RESPONSE.ERROR_ADDING;
  }
}

export async function enrichLineItems(
  lineItems: LineItem[],
  regionId: string,
): Promise<
  | Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[]
  | undefined
> {
  // Prepare query parameters
  const queryParams = {
    ids: lineItems.map((lineItem) => lineItem.variant.product_id),
    regionId: regionId,
  };

  // Fetch products by their IDs
  const products = await getProductsById(queryParams);

  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return [];
  }

  // Enrich line items with product and variant information

  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p) => p.id === item.variant.product_id);
    const variant = product?.variants.find((v) => v.id === item.variant_id);

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item;
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, "variants"),
      },
    };
  }) as LineItem[];

  return enrichedItems;
}

export async function getCheckoutStep(
  cart: Omit<Cart, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">
) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}
