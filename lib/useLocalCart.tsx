import React from "react";

export type LocalCartProps = {
  cartId: string | null;
  setCartId: React.Dispatch<React.SetStateAction<string | null>>;
  cartExists: boolean;
};

export function useLocalCart(): LocalCartProps {
  const [cartId, setCartId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      setCartId(cartId);
    }
  }, []);
  return { cartId, setCartId, cartExists: cartId !== null || cartId !== "" };
}
