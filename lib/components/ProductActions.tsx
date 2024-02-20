"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { ProductOption, Region } from "@medusajs/medusa/dist/models";
import { onlyUnique } from "../medusa/utils";
import { useParams } from "next/navigation";
import { isEqual } from "../utils";
import { addToCart } from "../medusa/cart/actions";

type Props = {
  product: PricedProduct;
  region: Region;
};

export default function ProductActions({ product }: Props) {
  const [options, setOptions] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);

  const countryCode = useParams().countryCode as string;

  useEffect(() => {
    const optionObj: Record<string, string> = {};
    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: "" });
    }
    setOptions(optionObj);
  }, [product]);

  const variants = product.variants;

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue;

      const temp: Record<string, string> = {};

      for (const option of variant.options) {
        temp[option.option_id] = option.value;
      }

      map[variant.id] = temp;
    }

    return map;
  }, [variants]);

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined;

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
    }

    return variants.find((v) => v.id === variantId);
  }, [options, variantRecord, variants]);

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord]);

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update });
  };

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return;
    setIsAdding(true);
    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode: countryCode,
    });
    setIsAdding(false);
  };

  function handleSelectOption(option: ProductOption, value: string) {
    const newOptions = { [option.id]: value };
    updateOptions(newOptions);
  }


  return (
    <div>
      {product.variants.length > 1 && (
        <div className="bg-transparent ">
          {(product.options || []).map((option) => {
            return (
              <div key={option.id}>
                <h3>{option.title}</h3>
                <select
                  className="bg-transparent"
                  onChange={(e) => handleSelectOption(option, e.target.value)}
                >
                  {option.values.map((value) => {
                    return (
                      <option key={value.id} value={value.value}>
                        {value.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={handleAddToCart}>
        {!isAdding ? "Add product to cart" : "Please wait"}
      </button>
    </div>
  );
}
