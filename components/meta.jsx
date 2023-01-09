/**
 * @param {string} title
 * @property {string} description
 * @property {string} path
 * @property {string?} image
 */
export default function Meta(props) {
  return (
    <>
      <title>{props.title}</title>
      <meta property="description" content={props.description} />

      <meta
        property="og:url"
        content={`https://www.sebastianojeda.com${props.path}`}
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
        content={`https://www.sebastianojeda.com${props.path}`}
      />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta
        property="twitter:image"
        content={
          props.image ?? "https://www.sebastianojeda.com/images/banner.png"
        }
      />
    </>
  );
}