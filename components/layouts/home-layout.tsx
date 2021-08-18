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
      <div className="bg-homepage pt-6">
        <Header />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 200"
        className="fill-current text-primary bg-homepage"
      >
        <path d="M0,64L80,58.7C160,53,320,43,480,58.7C640,75,800,117,960,117.3C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
      <Container>
        <main>{children}</main>
      </Container>
    </BaseLayout>
  );
}
