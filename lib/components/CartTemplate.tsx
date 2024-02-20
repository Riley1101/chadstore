import React from "react";
import { CartWithCheckoutStep } from "../medusa/types";
import { Customer } from "@medusajs/medusa/dist/models";

type Props = {
  cart: CartWithCheckoutStep | null;
  customer: Omit<Customer, "password_hash"> | null;
};

export function CartTemplate({ cart, customer }: Props) {
  console.log(cart);
  return (
    <div>
      {cart?.items.length ? (
        <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
          <div className="flex flex-col bg-white py-6 gap-y-6">
            {!customer && <>SignIn now</>}
          </div>
          <div className="relative">
            <div className="flex flex-col gap-y-8 sticky top-12">
              {cart && cart.region && (
                <>
                  <div className="bg-white py-6">Summary</div>
                  {cart.items.map((item) => (
                    <div key={item.id}>
                      {item.title} - {item.variant.title} - {item.quantity}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Cart is empty</p>
        </div>
      )}
    </div>
  );
}
