import { getProductList } from "@/lib/getProductList";
export default async function Page() {
  const productList = await getProductList({
    countryCode: "us",
  });
  return <div>Home</div>;
}
