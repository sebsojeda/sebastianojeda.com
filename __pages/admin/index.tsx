import Dashboard from "../../components/dashboard";
import AdminLayout from "../../layouts/admin-layout";
import Head from "next/head";
import { ReactElement } from "react";
import MusicProvider from "../../components/music-provider";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

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
    <MusicProvider>
      <AdminLayout>{page}</AdminLayout>
    </MusicProvider>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
