import Head from "next/head";
import Header from "../components/header";
import Layout from "../components/layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <Header>
        <h1>About Me</h1>
      </Header>
    </Layout>
  );
}
