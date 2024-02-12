"use client";
import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { CartProvider } from "medusa-react";
import { MedusaProvider } from "medusa-react";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export function AppMedusaProvider({ children }: Props) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000"
    >
      <CartProvider>{children}</CartProvider>
    </MedusaProvider>
  );
}
