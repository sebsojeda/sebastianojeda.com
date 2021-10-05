import Head from "next/head";
import Header from "../../components/header";
import Layout from "../../components/layout";

export default function Snippets() {
  return (
    <Layout>
      <Head>
        <title>Snippets</title>
      </Head>
      <Header>
        <h1>Snippets</h1>
      </Header>
    </Layout>
  );
}
