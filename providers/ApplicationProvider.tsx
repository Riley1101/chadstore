"use client";
import React from "react";
import { CartProvider } from "medusa-react";

type Props = {
  children: React.ReactNode;
};

export function ApplicationProvider({ children }: Props) {
  return <CartProvider>{children}</CartProvider>;
}
