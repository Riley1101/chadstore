"use client";
import React from "react";
import Link from "next/link";
import { Cart } from "./Cart";

type Props = {};

export function Header({}: Props) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  return (
    <header className="px-4  w-full h-[3em] flex items-center border justify-between">
      <Link href={"/"}>Logo</Link>
      <ul className="flex items-center gap-4">
        <li>
          <Cart isOpen={isCartOpen} setOpen={setIsCartOpen} />
        </li>
      </ul>
    </header>
  );
}
