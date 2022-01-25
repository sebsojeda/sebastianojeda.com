import Document, { Html, Head, Main, NextScript } from "next/document";
import FallbackStyles from "../components/fallback-styles";
import MagicScriptTag from "../components/magic-script-tag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
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
        </Head>
        <FallbackStyles />
        <body>
          <MagicScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
