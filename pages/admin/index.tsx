import { useAuth } from "../../components/auth-provider";
import Login from "../../components/login";
import MusicConnection from "../../components/music-connection";
import MusicProvider from "../../components/music-provider";
import AdminLayout from "../../layouts/admin-layout";

export default function Admin() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <MusicProvider>
      <AdminLayout>
        <MusicConnection />
      </AdminLayout>
    </MusicProvider>
  );
}
