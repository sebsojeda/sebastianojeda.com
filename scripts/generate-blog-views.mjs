import { globby } from "globby";
import client from "@prisma/client";

async function generateBlogViews() {
  const prisma = new client.PrismaClient();
  const pages = await globby(["data/blog/*.mdx"]);
  pages.forEach(async (page) => {
    const path = page.replace("data/blog/", "").replace(".mdx", "");
    await prisma.postViews.upsert({
      where: { slug: path },
      update: {},
      create: { slug: path, views: 0 },
    });
  });
}

generateBlogViews();
