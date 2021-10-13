import { ReactNode } from "react";
import { supabase } from "../lib/supabase";
import AuthProvider from "./auth-provider";
import MusicProvider from "./music-provider";
import ThemeProvider from "./theme-provider";

type AdminProviderProps = {
  children: ReactNode;
};

export default function AdminProviders(props: AdminProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider client={supabase}>
        <MusicProvider>{props.children}</MusicProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
