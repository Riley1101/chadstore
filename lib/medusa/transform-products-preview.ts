import { Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { CalculatedVariant, ProductPreviewType } from "./types";
import { formatAmount, getPercentageDiff } from "./currency-utils";

export function transformProductPreview(
  product: PricedProduct,
  region: Region,
): ProductPreviewType {
  const variants = product.variants as unknown as CalculatedVariant[];

  let cheapestVariant = undefined;

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((prev, current) => {
      return prev.calculated_price < current.calculated_price ? prev : current;
    }, variants[0]);
  }

  return {
    id: product.id!,
    title: product.title!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
    created_at: product.created_at,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
  }
}
