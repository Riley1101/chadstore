import React from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = {};

export function CartItem({}: Props) {
  let [quantity, setQuantity] = React.useState(1);
  return (
    <div className="w-full mb-2 flex items-center">
      <div className=" w-full flex items-center space-x-4 rounded-md border p-4 flex-wrap">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 basis-[50%]">
          <p className="text-sm font-medium leading-none">Push Notifications</p>
          <p className="text-sm text-muted-foreground">
            Send notifications to device.
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
