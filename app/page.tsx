import { Navbar } from "@/components/navbar";

export default async function Home() {
  return <main className="">
    <Navbar title="Eshmi" links={["Home", "About", "Products", "Contact"]} />
  </main>;
}
