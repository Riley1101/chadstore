import type {
  ProductCollection,
  StoreGetProductsParams,
} from "@medusajs/medusa";

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { getRegions } from "@/app/actions";
import { ProductPreviewType } from "../types";
import { medusaClient } from "../config";
import { transformProductPreview } from "../transform-products-preview";
import { getMedusaHeaders } from "../utils";

/**
 *  Empty response object for empty data
 */
const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
};

interface StoreResponse {
  response: {
    products: ProductPreviewType[];
    count: number;
  };
  nextPage: number | null;
  queryParams?: StoreGetProductsParams;
}

export async function getCollectionList(
  offset: number = 0,
  limit: number = 100,
): Promise<{
  collections: ProductCollection[];
  count: number;
}> {
  const collections = await medusaClient.collections
    .list({ limit, offset }, { next: { tags: ["collections"] } })
    .then(({ collections }) => collections)
    .catch((err) => {
      throw err;
    });
  const count = collections.length;
  return { collections, count };
}
export async function getProductsList({
  pageParam = 0,
  queryParams,
  countryCode,
}: {
  pageParam?: number;
  countryCode: string;
  queryParams?: StoreGetProductsParams;
}): Promise<StoreResponse> {
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
      console.log("error", e);
      throw e;
    });

  const transformedProducts = products.map((product) => {
    return transformProductPreview(product, regions!);
  });
  const nextPage = count > pageParam + 1 ? pageParam + 1 : null;

  return {
    response: { products: transformedProducts, count },
    nextPage,
    queryParams,
  };
}

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

export async function getProductsById({
  ids,
  regionId,
}: {
  ids: string[];
  regionId: string;
}) {
  const headers = getMedusaHeaders(["products"]);

  return medusaClient.products
    .list({ id: ids, region_id: regionId }, headers)
    .then(({ products }) => products)
    .catch((err) => {
      console.log(err);
      return null;
    });
}
