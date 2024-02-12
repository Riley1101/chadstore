import React from "react";
import { useCart } from "medusa-react";
import { useContext } from "react";
import { ApplicationContext } from "@/providers/ApplicationContext";

export type LocalCartProps = {
  cartId: string | null;
  setCartId: React.Dispatch<React.SetStateAction<string | null>>;
  cartExists: boolean;
};

export function useLocalCartContext(): LocalCartProps {
  const { cart } = useContext(ApplicationContext);

  React.useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      setCartId(cartId);
    }
  }, []);

  return {};
}
