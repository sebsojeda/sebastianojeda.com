import Head from "next/head";
import Header from "../../components/header";
import AppLayout from "../../layouts/app-layout";

export default function Snippets() {
  return (
    <AppLayout>
      <Head>
        <title>Snippets</title>
      </Head>
      <Header>
        <h1>Snippets</h1>
      </Header>
    </AppLayout>
  );
}
