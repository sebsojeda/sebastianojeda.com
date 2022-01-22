import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container(props: ContainerProps) {
  return <div className="max-w-3xl px-6 mx-auto">{props.children}</div>;
}
