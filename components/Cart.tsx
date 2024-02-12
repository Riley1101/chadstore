import React from "react";
import { CartItem } from "./CartItem";
import { useCart } from "medusa-react";
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
  const { cart } = useCart();
  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <ShoppingCartIcon size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border px-4 lg:px-[20%]">
        <DrawerHeader>
          <DrawerTitle>{!!!cart?.total ? "Empty cart" : "Items"}</DrawerTitle>
          <DrawerDescription>
            {!!!cart?.total ? "Please add items to proceed" : " 3 Items"}
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex flex-col p-4  w-full h-[400px]">
          {cart?.items.map((i) => <CartItem key={i.id} />)}
          <ScrollBar />
        </ScrollArea>
        <DrawerFooter className="flex items-center flex-row ">
          <DrawerClose className="ml-auto">
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Checkout Now</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
