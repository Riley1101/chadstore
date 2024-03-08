import { Toggle } from "./ui/toggle";

interface NavbarProps {
  title: string;
  links: string[];
}

export const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
  return (
  <div>
      <nav className="flex justify-between w-[80%] lg:w-[70%] 2xl:w-[60%] m-auto py-2">
        <div className="flex  items-center gap-[3em]">
        <h1>{title}</h1>
        <div className=" py-2 px-4 rounded-full bg-gray-100 flex">
            <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none text-sm italic" />
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 2xl:w-6 2xl:h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            </div>
        </div>
      <ul className="flex gap-5 items-center">
        {links.map((link, index) => (
          <li className="text-sm" key={index}>{link}</li>
        ))}
      </ul>
        </div>
      <div className="flex gap-5 items-center">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 2xl:w-6 2xl:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 2xl:w-6 2xl:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        <div className="language">
          <Toggle>EN</Toggle>
        </div>
      </div>
    </nav>
  </div>
  );
};
