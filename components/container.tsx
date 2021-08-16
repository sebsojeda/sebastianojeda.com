import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-6xl px-5">{children}</div>;
}
