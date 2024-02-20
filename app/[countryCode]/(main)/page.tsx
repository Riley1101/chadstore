import Image from "next/image";
import Link from "next/link";
import { getCollectionWithProducts } from "./getCollectionWithProducts";

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
