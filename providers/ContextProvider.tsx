"use client";

import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export function ApplicationContext({ children }: Props) {
  return <div>{children} </div>;
}
