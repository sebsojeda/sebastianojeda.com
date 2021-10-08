import Document, { Html, Head, Main, NextScript } from "next/document";
import FallbackStyles from "../components/fallback-styles";
import MagicScriptTag from "../components/magic-script-tag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
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
