import { CartTemplate } from "@/lib/components/CartTemplate";
import {
  enrichLineItems,
  getCheckoutStep,
  retrieveCart,
} from "@/lib/medusa/cart/actions";
import { CartWithCheckoutStep } from "@/lib/medusa/types";
import { getCustomer } from "@/lib/medusa/utils";
import { LineItem } from "@medusajs/medusa/dist/models";
import React from "react";

type Props = {};

export default async function CartPage({}: Props) {
  async function fetchCart() {
    const cart = await retrieveCart().then(
      (cart) => cart as CartWithCheckoutStep,
    );

    if (!cart) {
      return null;
    }

    if (cart?.items.length) {
      const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
      cart.items = enrichedItems as LineItem[];
    }

    cart.checkout_step =
      cart && (await getCheckoutStep(cart).then((res) => res));

    return cart;
  }

  const customer = await getCustomer();
  const cart = await fetchCart();

  return (
    <>
      <CartTemplate cart={cart} customer={customer} />
    </>
  );
}
