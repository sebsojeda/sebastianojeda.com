import Dashboard from "../../components/dashboard";
import AdminLayout from "../../layouts/admin-layout";
import Head from "next/head";
import AdminProviders from "../../components/admin-providers";
import { ReactElement } from "react";

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Dashboard />
    </>
  );
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminProviders>
      <AdminLayout>{page}</AdminLayout>
    </AdminProviders>
  );
};
