import React, { useContext } from "react";
import { ApplicationContext } from "@/providers/ApplicationContext";
import { CartItem } from "./CartItem";
import { useGetCart } from "medusa-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Cart({ isOpen, setOpen }: Props) {
  const cartContext = useContext(ApplicationContext);
  const cartId = cartContext?.cart?.cartId || "";
  const { cart } = useGetCart(cartId);
  console.log(cart)

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCartIcon size={20} />
          {cart?.items && cart?.items.length > 0 && (
            <span className="ml-2 bg-primary w-6 h-6 text-primary-foreground text-[12px] grid items-center rounded-full">
              {cart?.items.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border px-4 lg:px-[30%]">
        <DrawerHeader>
          <DrawerTitle>{!!!cart?.total ? "Empty cart" : "Items"}</DrawerTitle>
          <DrawerDescription>
            {!!!cart?.items
              ? "Please add items to proceed"
              : `${cart.items.length} items`}
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex flex-col p-4  w-full h-[400px]">
          {cart?.items.map((i) => <CartItem key={i.id} product={i} />)}
          <ScrollBar />
        </ScrollArea>
        <DrawerFooter className="flex items-center flex-row ">
          <DrawerClose className="ml-auto" asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Checkout Now</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
