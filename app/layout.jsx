import { Inter } from "@next/font/google";
import Container from "../components/container";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import SkipToContent from "../components/skip-to-content";
import ThemeHydration from "../components/ThemeHydration";
import "../styles/global.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

/**
 * Props for the `RootLayout` component.
 *
 * @typedef {object} RootLayoutProps
 * @property {import("react").ReactNode} children - The component to wrap.
 */

/**
 * Wraps all pages in the application.
 *
 * @param {RootLayoutProps} props - {@link RootLayoutProps}
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 scroll-smooth">
        <ThemeHydration />
        <SkipToContent />
        <Navigation />
        <Container>
          <main id="skip-to-content">{children}</main>
        </Container>
        <Footer />
      </body>
    </html>
  );
}
