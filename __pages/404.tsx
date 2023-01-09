import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1 className="inline-block font-bold">Page Not Found</h1>
      <p className="mb-14 text-accent-5">
        That page does not exist but you can explore the{" "}
        <Link href="/blog" className="text-success hover:text-success-dark">
          Blog
        </Link>
        .
      </p>
    </>
  );
}
