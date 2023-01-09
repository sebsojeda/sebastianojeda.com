import kebabCase from "lodash.kebabcase";

export default async function getGists() {
  const response = await fetch("https://api.github.com/users/sebsojeda/gists", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    credentials: "same-origin",
    next: { revalidate: 60 },
  });
  const gists = await response.json();
  return gists.map((gist) => {
    const { description, id, files } = gist;
    const filesNames = Object.keys(files);
    const title = filesNames[0].replace(/\.[A-Za-z]+$/, "");
    const slug = kebabCase(title);
    return {
      title,
      slug,
      description,
      id,
    };
  });
}
