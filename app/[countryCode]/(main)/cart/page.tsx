import { retrieveCart } from "@/lib/medusa/cart/actions";
import { CartWithCheckoutStep } from "@/lib/medusa/types";
import { LineItem } from "@medusajs/medusa/dist/models";
import React from "react";

type Props = {};

export default function CartPage({}: Props) {
  async function fetchCart() {
    const cart = await retrieveCart().then(
      (res) => res as CartWithCheckoutStep,
    );
    if (!cart) return null;

    if (cart?.items.length) {
    }

    return cart;
  }
  return <div></div>;
}
