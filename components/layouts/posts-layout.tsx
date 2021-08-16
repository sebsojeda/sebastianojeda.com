import { ReactNode } from "react";
import Container from "../container";
import Header from "../header";
import BaseLayout from "./base-layout";

interface PostsLayoutProps {
  children: ReactNode;
}

export default function PostsLayout({ children }: PostsLayoutProps) {
  return (
    <BaseLayout>
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
    </BaseLayout>
  );
}
