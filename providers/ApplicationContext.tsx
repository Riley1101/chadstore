import { createContext, useEffect, useState } from "react";
import { useCart } from "medusa-react";

export interface LocalCart {
  cartId: string | null;
  updateCartId: (id: string) => void;
  clearCartId: () => void;
}

/**
 * 1 check if local storage has a cart id
 * 2 if not, create a new cart and store the id in local storage
 * 3 if yes, use the existing cart id
 */
export function useLocalCartContext() {
  const [cartId, setCartId] = useState<null | string>(null);
  const { createCart } = useCart();

  useEffect(() => {
    let localCartId = localStorage.getItem("cartId");
    if (!localCartId) {
      createCart.mutate(
        {},
        {
          onSuccess({ cart }) {
            localStorage.setItem("cartId", cart.id);
          },
        },
      );
      return;
    }
    setCartId(localCartId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateCartId(id: string) {
    setCartId(id);
    localStorage.setItem("cartId", id);
  }

  function clearCartId() {
    setCartId(null);
    localStorage.removeItem("cartId");
  }

  return { cartId, updateCartId, clearCartId };
}

export interface LocalContextProps {
  cart: LocalCart;
}

export const ApplicationContext = createContext<LocalContextProps | null>(null);
