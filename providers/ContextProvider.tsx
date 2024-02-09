"use client";

import { CartProvider } from "medusa-react";
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export function ApplicationContext({ children }: Props) {
  return <CartProvider>{children} </CartProvider>;
}
