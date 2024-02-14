import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { medusaClient } from "./medusa/config";
import { getMedusaHeaders } from "./medusa/utils";

export async function getProductByHandle(
  handle: string,
): Promise<{ product: PricedProduct }> {
  const headers = await getMedusaHeaders();

  const product = await medusaClient.products
    .list({ handle }, headers)
    .then(({ products }) => products[0])
    .catch((err) => {
      throw err;
    });

  return { product };
}
