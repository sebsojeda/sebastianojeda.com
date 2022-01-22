import { ReactNode } from "react";
import Container from "../components/container";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import SkipToContent from "../components/skip-to-content";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout(props: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <SkipToContent />
      <Navigation />
      <Container>
        <main id="skip-to-content">{props.children}</main>
      </Container>
      <Footer />
    </div>
  );
}
