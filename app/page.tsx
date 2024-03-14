import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function Home() {
  return <main className="">
    <Navbar title="Eshmi" links={["Home", "About", "Products", "Contact"]} />
    {/* banner img */}
    <section className="hero grid content-center h-[80vh]">
      <div className="w-[90%] 2xl:w-[78%] m-auto flex flex-col gap-3 items-start  ">
        <h1 className="text-7xl text-center font-bold uppercase tracking-tight">Sale</h1>
        	<Button size={'lg'}>See Our Menus</Button></div>
    </section>
    {/* sliders and tags */}
    <section className="py-[4em]">
      {/* tags */}
        <div className="w-[90%] 2xl:w-[78%] m-auto py-5 border-b-[1px] border-solid border-gray-300">
        <h4 className="font-semibold text-[15px]">Browse categories</h4>
         <div className="flex gap-3 py-2">
         <Button variant={"secondary"}>Japanese Cuisine</Button>
         <Button variant={"secondary"}>Korean Cuisine</Button>
         <Button variant={"secondary"}>Asian Cuisine</Button>
         <Button variant={"secondary"}>Taiwan Cuisine</Button>
         </div>
        </div>
        {/* slider 1 */}
        <div className="w-[90%] 2xl:w-[78%] m-auto py-[4em] border-b-[1px] border-solid border-gray-300">
        <div className="flex justify-between">
            <div className="grid gap-1"><h4 className="font-bold text-lg">Popular Menus</h4>
            <p className="text-[15px]">The most ordered menus can be found here</p></div>
          <Button variant={"secondary"}>View all</Button></div>
          <div className="pt-5">
          <Carousel
            opts={{
              align: "start",
            }}
            className="max-w-full"
          >
            <CarouselContent>
              {[...Array(5)].map((_, i) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={i}>
                    <div className="grid gap-2">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center py-2">
                          <img
                            src="https://source.unsplash.com/400x400/?food"
                            alt="food"
                            className="object-cover w-full h-full"
                          />
                        </CardContent>
                      </Card>
                      <div className="grid gap-2">
                          <div><h4 className="text-[15px] font-semibold">Sushi</h4>
                          <Button variant={"secondary"} size={"xxs"} asChild>
                            <span className="text-[10px]">Japanese Cuisine</span>
                            </Button></div>
                          <div className="flex gap-2">
                          <span className="text-sm text-green-900 font-bold">$ 15</span> <Button variant={'secondary'} size={'xxs'} asChild>
                          <span className="text-[12px] font-extrabold">-10%</span>
                          </Button>
                          </div>
                          </div>
                    </div>
                 
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          </div>
        </div>
          {/* slider 2 */}
          <div className="w-[90%] 2xl:w-[78%] m-auto py-[4em]">
        <div className="flex justify-between">
            <div className="grid gap-1"><h4 className="font-bold text-lg">Japanese Cuisines</h4>
            <p className="text-[15px]">Fresh Japanese home cooking recipes</p></div>
          <Button variant={"secondary"}>View all</Button></div>
          <div className="pt-5">
          <Carousel
            opts={{
              align: "start",
            }}
            className="max-w-full"
          >
            <CarouselContent>
              {[...Array(5)].map((_, i) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={i}>
                    <div className="grid gap-2">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center py-2">
                          <img
                            src="https://source.unsplash.com/400x400/?food"
                            alt="food"
                            className="object-cover w-full h-full"
                          />
                        </CardContent>
                      </Card>
                      <div className="grid gap-2">
                          <div><h4 className="text-[15px] font-semibold">Sushi</h4>
                          <Button variant={"secondary"} size={"xxs"} asChild>
                            <span className="text-[10px]">Japanese Cuisine</span>
                            </Button></div>
                          <div className="flex gap-2">
                          <span className="text-sm text-green-900 font-bold">$ 15</span> <Button variant={'secondary'} size={'xxs'} asChild>
                          <span className="text-[12px] font-extrabold">-10%</span>
                          </Button>
                          </div>
                          </div>
                    </div>
                 
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          </div>
        </div>
    </section>
    {/* footer */}
    <section className="w-[95%] m-auto">
      <div className="border-b-[1px] border-solid border-gray-300 grid grid-cols-3 py-[4em]">
        <div className="">
          <h3 className="text-4xl uppercase font-extrabold tracking-widest pb-2">Eshimi</h3>
          <ul className=" 2xl:text-md">
            <li>eshimi@gmail.com</li>
            <li>+1234567890</li>
            <li>Main St.10, EAC2CQ, USA</li>
          </ul>
        </div>
        <div className="grid gap-2">
          <div className=" 2xl:text-md"><h3 className="font-semibold">About Us</h3>
          <ul>
            <li>Blogs</li>
          </ul></div>
          <div className=" 2xl:text-md"><h3 className="font-semibold">Shop</h3>
          <ul>
            <li>Plants</li>
            <li>Kitchen</li>
            <li>Wallart</li>
          </ul></div>
        </div>
      </div>
      <div className="flex justify-between  2xl:text-md py-[1.5em]">
        <div>Powered by <u>Nawphire Developer Team</u></div>
        <div>Copyright by Eshimi &#169; 2023</div>
      </div>
    </section>
  </main>;
}
