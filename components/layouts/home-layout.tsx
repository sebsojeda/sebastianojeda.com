import { ReactNode } from "react";
import BaseLayout from "./base-layout";
import Container from "../container";
import Header from "../header";

export interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <BaseLayout>
      <Header />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bg-blue fill-current text-white dark:text-black"
      >
        <path d="M0,128L80,117.3C160,107,320,85,480,101.3C640,117,800,171,960,170.7C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
      <Container>
        <main>{children}</main>
      </Container>
    </BaseLayout>
  );
}
