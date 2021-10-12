import { kebabCase } from "./utils";

const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const USER_GISTS_ENDPOINT = "https://api.github.com/users/sebsojeda/gists";
const USER_GIST_ENDPOINT = "https://api.github.com/gists";

export async function listGists() {
  const response = await fetch(USER_GISTS_ENDPOINT, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${ACCESS_TOKEN}`,
    },
    credentials: "same-origin",
  });
  const data: any[] = await response.json();
  return data.map((gist) => {
    const { description, id, files } = gist;
    const filename = Object.keys(files)[0];
    const title = filename.replace(/\.[A-Za-z]+$/, "");
    const slug = kebabCase(title);
    return {
      title,
      slug,
      description,
      id,
      filename,
    };
  });
}

export async function getGistById(id: string) {
  const response = await fetch(`${USER_GIST_ENDPOINT}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${ACCESS_TOKEN}`,
    },
    credentials: "same-origin",
  });
  const data = await response.json();
  return data;
}
