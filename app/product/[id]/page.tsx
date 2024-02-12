"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

import { useCart, useProduct } from "medusa-react";

interface Props {
  params: {
    id: string;
  };
}

export default function Page(props: Props) {
  const { params } = props;
  const { id } = params;
  const { product, isLoading } = useProduct(id);
  const [selectedVariant, setSelectedVariant] = React.useState<
    string | undefined
  >();
  const { cart, createCart } = useCart();

  function createEmptyCart() {
    console.log(cart);
    createCart.mutate(
      {}, // create an empty cart
      {
        onSuccess: ({ cart }) => {
          localStorage.setItem("cart_id", cart.id);
          console.log(cart,"success")
        },
      },
    );
    console.log(cart);
  }

  function handleAddToCart() {
    createEmptyCart();
  }

  const hasVariants = !!product?.variants;
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="grid grid-cols-2 gap-8 min-h-[400px] py-12">
      <div className="grid grid-row-2 gap-4">
        <div className="min-w-[350px] aspect-square">
          <Image
            src={product?.thumbnail as string}
            alt={product?.title as string}
            width={350}
            height={350}
            className="object-cover w-full h-full"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {product?.title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {product?.description}
        </p>

        {hasVariants && (
          <div className="max-w-max mt-4">
            <span className="mb-2 block text-sm">Available Size</span>
            <Select
              required
              onValueChange={(e) => setSelectedVariant(e)}
              value={selectedVariant}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                {!!product?.variants &&
                  product?.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant?.id as string}>
                      {variant?.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="mt-auto mb-4">
          <Carousel>
            <CarouselContent>
              {!!product?.images &&
                product?.images.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="overflow-hidden cursor-pointer basis-1/4 aspect-square "
                  >
                    <Image
                      src={image?.url as string}
                      alt={product?.description as string}
                      width={100}
                      height={100}
                      className="border  w-full h-full object-cover"
                    ></Image>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>

        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </div>
  );
}
