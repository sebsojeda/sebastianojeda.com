import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../layouts/app-layout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "../components/theme-provider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page: any) => <AppLayout>{page}</AppLayout>);

  return (
    <SessionProvider session={session}>
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </SessionProvider>
  );
}
