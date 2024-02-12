"use client";
import React from "react";
import {
  LocalContextProps,
  ApplicationContext,
  useLocalCartContext,
} from "./ApplicationContext";

type Props = {
  children: React.ReactNode;
};

export function ApplicationProvider({ children }: Props) {
  const cart = useLocalCartContext();

  const defaultContext: LocalContextProps = {
    cart: cart,
  };

  return (
      <ApplicationContext.Provider value={defaultContext}>
        {children}
      </ApplicationContext.Provider>
  );
}
