import { getCollectionList, getProductsList } from "@/lib/getProductList";
import { Product } from "@medusajs/medusa";
import Image from "next/image";
import Link from "next/link";

async function getCollectionWithProducts(countryCode: string) {
  const { collections } = await getCollectionList(0, 3).then((coll) => coll);
  if (!collections) {
    return null;
  }
  const collectionIds = collections.map((collection) => collection.id);
  await Promise.all(
    collectionIds.map((id) =>
      getProductsList({
        queryParams: { collection_id: [id] },
        countryCode,
      }),
    ),
  ).then((responses) =>
    responses.forEach(({ response, queryParams }) => {
      let collection;

      if (collections) {
        collection = collections.find(
          (collection) => collection.id === queryParams?.collection_id?.[0],
        );
      }

      if (!collection) {
        return;
      }
      collection.products = response.products as unknown as Product[];
    }),
  );
  return collections;
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string };
}) {
  const collectionList = await getCollectionWithProducts(countryCode);
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-2xl">Products</h1>
      {collectionList?.map((collection) => {
        return (
          <div key={collection.id} className="py-4">
            <h1 className="mb-4 text-xl font-bold">{collection.title}</h1>
            <ul className="flex flex-wrap gap-4">
              {collection.products?.map((product) => (
                <li key={product.id}>
                  <Image
                    src={product.thumbnail as string}
                    alt={product.title}
                    width={200}
                    height={200}
                  />
                  <h2 className="mt-2">{product.title}</h2>
                  <p>{product.description}</p>
                  <Link
                    href={`/${countryCode}/${collection.handle}/${product.handle}`}
                  >
                    Read More
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </main>
  );
}
