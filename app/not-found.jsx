import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1 className="inline-block font-bold">Page Not Found</h1>
      <p className="mb-14 text-neutral-500 dark:text-neutral-400">
        That page does not exist. Feel free to explore the{" "}
        <Link href="/blog" className="text-blue-500 hover:text-blue-600">
          Blog
        </Link>
        .
      </p>
    </>
  );
}
