import { css } from "@emotion/react";
import { ReactNode } from "react";
import Container from "./container";
import Footer from "./footer";
import Navigation from "./navigation";

interface LayoutProps {
  children: ReactNode;
}

const Styles = {
  layout: css`
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: Inter, Arial, Helvetica, sans-serif;
    min-height: 100vh;
  `,
};

export default function Layout(props: LayoutProps) {
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
