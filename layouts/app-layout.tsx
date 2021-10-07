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
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: Inter, Arial, Helvetica, sans-serif;
    min-height: 100vh;
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
