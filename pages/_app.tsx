import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../layouts/app-layout";
import AppProviders from "../components/app-providers";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Override the Component to allow for custom layouts
  const getLayout =
    Component.getLayout ??
    ((page: any) => (
      <AppProviders>
        <AppLayout>{page}</AppLayout>
      </AppProviders>
    ));

  return getLayout(<Component {...pageProps} />);
}
