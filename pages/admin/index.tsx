import AuthProvider from "../../components/auth-provider";
import MusicProvider from "../../components/music-provider";
import { supabase } from "../../lib/supabase";
import Dashboard from "../../components/dashboard";

export default function Admin() {
  return (
    <AuthProvider client={supabase}>
      <MusicProvider>
        <Dashboard />
      </MusicProvider>
    </AuthProvider>
  );
}
