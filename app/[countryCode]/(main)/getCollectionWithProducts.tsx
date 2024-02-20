import { getProductsList, getCollectionList } from "@/lib/medusa/products/actions";
import { Product } from "@medusajs/medusa";

export async function getCollectionWithProducts(countryCode: string) {
    const { collections } = await getCollectionList(0, 3).then((coll) => coll);
    if (!collections) {
        return null;
    }
    const collectionIds = collections.map((collection) => collection.id);
    await Promise.all(
        collectionIds.map((id) => getProductsList({
            queryParams: { collection_id: [id] },
            countryCode,
        })
        )
    ).then((responses) => responses.forEach(({ response, queryParams }) => {
        let collection;

        if (collections) {
            collection = collections.find(
                (collection) => collection.id === queryParams?.collection_id?.[0]
            );
        }

        if (!collection) {
            return;
        }
        collection.products = response.products as unknown as Product[];
    })
    );
    return collections;
}

