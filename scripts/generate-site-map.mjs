import fs from "fs";
import { globby } from "globby";
import kebabCase from "lodash.kebabcase";
import prettier from "prettier";
import https from "https";

const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN ?? "";

async function writeSiteMap(snippets) {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/**/*.tsx",
    "data/**/*.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/admin",
    "!pages/404.tsx",
    "!pages/**/[slug].tsx",
  ]);
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace("pages", "")
            .replace("data", "")
            .replace(".tsx", "")
            .replace(".mdx", "")
            .replace("/index", "");

          return `
            <url>
              <loc>${`https://www.sebastianojeda.com${path}`}</loc>
            </url>
          `;
        })
        .join("")}
        ${snippets
          .map((snippet) => {
            const filesNames = Object.keys(snippet.files);
            const title = filesNames[0].replace(/\.[A-Za-z]+$/, "");
            const slug = kebabCase(title);

            return `
            <url>
              <loc>${`https://www.sebastianojeda.com/snippets/${slug}`}</loc>
            </url>
          `;
          })
          .join("")}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
}

async function generateSiteMap() {
  https
    .request(
      {
        method: "GET",
        host: "api.github.com",
        path: "/users/sebsojeda/gists",
        headers: {
          "User-Agent": "node",
          Authorization: `token ${ACCESS_TOKEN}`,
        },
      },
      (response) => {
        let snippets = "";
        response.on("data", (chunk) => (snippets += chunk));
        response.on("end", () => writeSiteMap(JSON.parse(snippets)));
      }
    )
    .end();
}

generateSiteMap();
