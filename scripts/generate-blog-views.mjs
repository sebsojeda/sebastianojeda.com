import { globby } from "globby";
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.SUPABASE_SERVICE_KEY ?? "";

async function generateBlogViews() {
  const pages = await globby(["data/blog/*.mdx"]);
  const supabase = createClient(URL, KEY);

  pages.forEach(async (page) => {
    const path = page.replace("data/blog/", "").replace(".mdx", "");
    await supabase.from("blog_views").insert([{ slug: path, views: 0 }]);
  });
}

generateBlogViews();
