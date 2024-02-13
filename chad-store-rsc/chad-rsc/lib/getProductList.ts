import type { Product, StoreGetProductsParams } from "@medusajs/medusa";

import { medusaClient } from "./medusa/config";
import { getRegions } from "@/app/actions";

/**
 *  Empty response object for empty data
 */
const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
};

interface StoreResponse {
  response: {
    products: Product[];
    count: number;
  };
  nextPage: number | null;
  queryParams?: StoreGetProductsParams;
}

export async function getProductList({
  pageParam = 0,
  queryParams,
  countryCode,
}: {
  pageParam?: number;
  queryParams?: StoreGetProductsParams;
  countryCode: string;
}) {
  const limit = queryParams?.limit || 10;
  const regions = await getRegions(countryCode);
  if (!regions) {
    return emptyResponse;
  }
  const { products, count } = await medusaClient.products
    .list(
      {
        limit,
        offset: pageParam,
        region_id: regions.id,
        ...queryParams,
      },
      {
        next: { tags: ["products"] },
      },
    )
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
}
