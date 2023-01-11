import fs from "fs";
import { globby } from "globby";
import https from "https";
import kebabCase from "lodash.kebabcase";
import prettier from "prettier";

async function writeSiteMap(snippets) {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "app",
    "content",
    "!**/**/head.jsx",
    "!**/**/layout.jsx",
    "!**/**/not-found.jsx",
    "!**/**/[slug]/**",
  ]);
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace("app/", "")
            .replace("content/", "")
            .replace(".jsx", "")
            .replace(".mdx", "")
            .replace("page", "");

          return `
            <url>
              <loc>${`https://www.sebastianojeda.com/${path}`}</loc>
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
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
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
