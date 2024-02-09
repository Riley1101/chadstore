import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

interface Props {
  data: PricedProduct;
}
export function ProductCard({ data }: Props) {
  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={data.thumbnail as string}
          alt={data.title as string}
          width={300}
          height={300}
          className="w-full object-cover aspect-square"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link
          href={`/product/${data.id}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Add to Cart
        </Link>
      </CardFooter>
    </Card>
  );
}
