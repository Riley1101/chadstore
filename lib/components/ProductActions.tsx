"use client";
import React, { useEffect, useState } from "react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { ProductOption, Region } from "@medusajs/medusa/dist/models";
import { onlyUnique } from "../medusa/utils";

type Props = {
  product: PricedProduct;
  region: Region;
};

export default function ProductActions({ product, region }: Props) {
  const [options, setOptions] = useState<Record<string, string>>({});

  function uniqueVariants(productOption: ProductOption) {
    return productOption.values.map((v) => v.value).filter(onlyUnique);
  }

  return (
    <div>
      {product.variants.length > 1 && (
        <div className="bg-transparent ">
          {(product.options || []).map((option) => {
            return (
              <div key={option.id}>
                <h3>{option.title}</h3>
                <select className="bg-transparent">
                  {uniqueVariants(option).map((value) => {
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
