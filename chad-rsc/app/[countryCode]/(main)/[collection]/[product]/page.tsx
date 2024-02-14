import { Region } from "@medusajs/medusa";
import React from "react";
import { getProductByHandle } from "@/lib/getProducts";
import LocalizedLink from "@/lib/components/LocalizedLink";
import { medusaClient } from "@/lib/medusa/config";
import { getMedusaHeaders } from "@/lib/medusa/utils";
import { getRegions } from "@/app/actions";
import { notFound } from "next/navigation";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type Props = {
  params: {
    collection: string;
    product: string;
    countryCode: string;
  };
};

export async function retrievePricedProductById({
  id,
  regionId,
}: {
  id: string;
  regionId: string;
}) {
  const headers = getMedusaHeaders(["products"]);

  return medusaClient.products
    .retrieve(`${id}?region_id=${regionId}`, headers)
    .then(({ product }) => product)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

async function getPricedProductByHandle(handle: string, region: Region) {
  const { product } = await getProductByHandle(handle).then((res) => res);
  if (!product) {
    return null;
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id as string,
    regionId: region.id,
  });
  return pricedProduct;
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegions(params.countryCode);
  if (!region) return notFound();
  let product = await getPricedProductByHandle(params.product, region);
  if (!product) return notFound();
  return (
    <div className="container mx-auto py-24">
      <ProductInfo product={product} />
      <ProductTabs product={product} />
    </div>
  );
}

function ProductInfo({ product }: { product: PricedProduct }) {
  return (
    <div className="space-y-4">
      {product.collection && (
        <LocalizedLink href={`/collections/${product.collection.handle}`}>
          {product.collection.title}
        </LocalizedLink>
      )}
      <h1 className="text-4xl">{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}

function ProductTabs({ product }: { product: PricedProduct }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl">Product Information</h2>
      <ProductInfoTab product={product} />
      <h2 className="text-xl">Shipping & Returns</h2>
      <ShippingInfo />
    </div>
  );
}

const ProductInfoTab = ({ product }: { product: PricedProduct }) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">Tags</span>
        </div>
      ) : null}
    </div>
  );
};

const ShippingInfo = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
