import { getRegions } from "@/app/actions";
import { cookies } from "next/headers";
import { getMedusaHeaders } from "../utils";
import { medusaClient } from "../config";
import { StorePostCartReq } from "@medusajs/medusa/dist/api";
import { revalidateTag } from "next/cache";

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
