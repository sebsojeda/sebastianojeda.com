import Head from "next/head";
import Header from "../components/header";
import AppLayout from "../layouts/app-layout";

export default function About() {
  return (
    <AppLayout>
      <Head>
        <title>About</title>
      </Head>
      <Header>
        <h1>About Me</h1>
      </Header>
    </AppLayout>
  );
}
