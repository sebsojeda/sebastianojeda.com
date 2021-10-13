import AuthProvider from "../../components/auth-provider";
import MusicProvider from "../../components/music-provider";
import { supabase } from "../../lib/supabase";
import Dashboard from "../../components/dashboard";
import AdminLayout from "../../layouts/admin-layout";
import Head from "next/head";

export default function Admin() {
  return (
    <AuthProvider client={supabase}>
      <MusicProvider>
        <AdminLayout>
          <Head>
            <title>Admin</title>
          </Head>
          <Dashboard />
        </AdminLayout>
      </MusicProvider>
    </AuthProvider>
  );
}
