import Meta from "./components/Meta";

/**
 * Default metadata to include on all pages.
 */
export default function RootHead() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <Meta
        title="Sebastian Ojeda - Developer and creative coder."
        description="I make it my mission to deliver value through user-centered tools, applications, and seamless integration with the cloud."
        path=""
      />
    </>
  );
}
