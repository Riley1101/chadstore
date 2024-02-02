"use client";
import React from "react";
import { ProductCard } from "./ProductCard";
import { useProducts } from "medusa-react";
import { SkeletonCard } from "./Skeleton";

type Props = {};

export function ProductList({}: Props) {
  const { products, isLoading } = useProducts();
  const dummy = Array.from({ length: 10 }, (_, i) => i);

  if (isLoading) {
    return (
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummy?.map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((i) => <ProductCard key={i.id} data={i} />)}
    </div>
  );
}
