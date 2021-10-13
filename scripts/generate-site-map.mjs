import fs from "fs";
import path from "path";
import { globby } from "globby";
import prettier from "prettier";

async function generateSiteMap() {
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

  const gists = fs.readFileSync(
    path.join(import.meta.url, "../../cache/gists.json").toString()
  );
  const snippets = JSON.parse(gists);

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
          ${snippets.map((snippet) => {
            return `
              <url>
                <loc>${`https://www.sebastianojeda.com/snippets/${snippet.slug}`}</loc>
              </url>
            `.join("");
          })}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
}

generateSiteMap();
