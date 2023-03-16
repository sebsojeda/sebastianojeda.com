import Meta from "./components/Meta";

/**
 * Default metadata to include on all pages.
 */
export default function RootHead() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <Meta
        title="Sebastian Ojeda - Developer and creative coder."
        description="I make it my mission to deliver value through user-centered tools, applications, and seamless integration with the cloud."
        path=""
      />
    </>
  );
}
