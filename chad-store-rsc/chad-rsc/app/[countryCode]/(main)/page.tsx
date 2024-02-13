import { getProductList } from "@/lib/getProductList";
export default async function Page() {
  const productList = await getProductList({
    countryCode: "us",
  });
  console.log(productList)
  return <div>Home</div>;
}
