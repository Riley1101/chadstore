import React from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import type { LineItem } from "@medusajs/medusa";

type Props = {
  product: LineItem;
};

export function CartItem({ product }: Props) {
  let [quantity, setQuantity] = React.useState(product.quantity);
  return (
    <div className="w-full mb-2 flex items-center">
      <div className=" w-full flex items-center space-x-4 rounded-md border p-4 flex-wrap">
        <Avatar>
          {product.thumbnail && (
            <AvatarImage src={product.thumbnail} className="object-cover" />
          )}
          <AvatarFallback>{product.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 basis-[50%]">
          <p className="text-sm font-medium leading-none">{product?.title}</p>
          <p className="text-sm text-muted-foreground">
            {product?.description}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2 items-center">
          <Button variant={"ghost"} onClick={() => setQuantity(++quantity)}>
            <PlusIcon size={14} />
          </Button>
          <span className="block text-lg">{quantity}</span>

          <Button variant={"ghost"} onClick={() => setQuantity(--quantity)}>
            <MinusIcon size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
