import getGists from "./getGists";

export async function getGist(slug) {
  const gists = await getGists();
  const gist = gists.find((gist) => gist.slug === slug);
  if (!gist) {
    return undefined;
  }
  const response = await fetch(`https://api.github.com/gists/${gist.id}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    credentials: "same-origin",
    next: { revalidate: 60 },
  });
  const snippet = await response.json();
  const files = Object.entries(snippet.files).map(([_, file]) => file);
  return {
    ...gist,
    files,
    url: snippet.html_url,
  };
}
