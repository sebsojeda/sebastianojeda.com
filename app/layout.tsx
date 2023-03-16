import { Inter } from "@next/font/google";
import "../styles/global.css";
import AnalyticsWrapper from "./components/Analytics";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import SkipToContent from "./components/SkipToContent";
import ThemeHydration from "./components/ThemeHydration";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * Wraps all pages in the application.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <ThemeHydration />
      </head>
      <body className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 scroll-smooth">
        <SkipToContent />
        <Navigation />
        <Container>
          <main id="skip-to-content">{children}</main>
        </Container>
        <Footer />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
