import { Product, Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { CalculatedVariant, ProductPreviewType } from "./types";

function transformProductPreview(
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
}
