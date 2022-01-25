import Head from "next/head";
import { useRouter } from "next/router";
import { useTheme } from "./theme-provider";

type MetaProps = {
  title: string;
  description: string;
  image?: string;
};

export default function Meta(props: MetaProps) {
  const router = useRouter();
  const { colorMode, systemPreference } = useTheme();
  const isDark =
    colorMode === "dark" ||
    (colorMode === "system" && systemPreference === "dark");
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="description" content={props.description} />

      <meta
        property="og:url"
        content={`https://www.sebastianojeda.com${router.asPath}`}
      />
      <meta property="og:type" content="text/html" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content={
          props.image ?? "https://www.sebastianojeda.com/images/banner.png"
        }
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="sebastianojeda.com" />
      <meta
        property="twitter:url"
        content={`https://www.sebastianojeda.com${router.asPath}`}
      />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta
        property="twitter:image"
        content={
          props.image ?? "https://www.sebastianojeda.com/images/banner.png"
        }
      />
      <meta name="theme-color" content={isDark ? "#000000" : "#ffffff"} />
    </Head>
  );
}
