export default function Footer() { 
return (
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
)
}