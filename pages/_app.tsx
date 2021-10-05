import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "../components/theme-provider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
