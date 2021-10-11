import { useAuth } from "./auth-provider";
import Login from "./login";
import MusicConnection from "./music-connection";
import AdminLayout from "../layouts/admin-layout";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <AdminLayout>
      <MusicConnection />
    </AdminLayout>
  );
}
