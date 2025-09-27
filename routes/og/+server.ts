import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { html } from "satori-html";

export async function GET({ url }: Request) {
  const inter = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.woff"
  ).then((res) => res.arrayBuffer());

  const roboto = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/roboto-mono@latest/latin-400-normal.woff"
  ).then((res) => res.arrayBuffer());

  const title = url.searchParams.get("title") ?? "Sebastian Ojeda's Blog";

  const template = html`
    <div
      style="width: 100%; height: 100%; background: #fff; padding: 2.5rem; display: flex; flex-direction: column; color: #09090b;"
    >
      <div style="display: flex; justify-content: space-between;">
        <span style="font-size: 2.5rem;">Sebastian Ojeda</span>
        <span
          style="font-size: 2rem; font-family: 'Roboto Mono'; color: #71717a;"
          >sebastianojeda.com</span
        >
      </div>
      <div style="display: flex; justify-content: center; text-align: center;">
        <span
          style="margin-top: 8.5rem; font-size: 4rem; padding: 1rem; background: #f4f4f5; border-radius: 0.125rem;"
          >${title}</span
        >
      </div>
    </div>
  `;

  const svg = await satori(template, {
    fonts: [
      {
        name: "Inter",
        data: inter,
        weight: 500,
      },
      {
        name: "Roboto Mono",
        data: roboto,
        weight: 400,
      },
    ],
    height: 630,
    width: 1200,
  });

  const resvg = new Resvg(svg);
  const buffer = resvg.render();

  return new Response(buffer.asPng(), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
