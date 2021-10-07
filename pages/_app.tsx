import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "../components/theme-provider";
import AuthProvider from "../components/auth-provider";
import { supabase } from "../lib/supabase";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider client={supabase}>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
