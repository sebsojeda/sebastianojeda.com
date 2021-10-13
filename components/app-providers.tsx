import { ReactNode } from "react";
import ThemeProvider from "./theme-provider";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProviders(props: AppProviderProps) {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}
