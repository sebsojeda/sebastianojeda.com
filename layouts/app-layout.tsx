import { css } from "@emotion/react";
import { ReactNode } from "react";
import Container from "../components/container";
import Footer from "../components/footer";
import Navigation from "../components/navigation";

type AppLayoutProps = {
  children: ReactNode;
};

const Styles = {
  layout: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,
};

export default function AppLayout(props: AppLayoutProps) {
  return (
    <div css={Styles.layout}>
      <Navigation />
      <Container>
        <main>{props.children}</main>
      </Container>
      <Footer />
    </div>
  );
}
