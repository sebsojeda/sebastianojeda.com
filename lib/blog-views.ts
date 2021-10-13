import { supabase } from "./supabase";

export async function getViewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_views")
    .select("views")
    .eq("slug", slug);
  if (error) {
    return { data: null, error };
  }
  if (!data || data.length === 0) {
    return { data: null, error: new Error("Unable to get page views") };
  }
  return { data: { ...data[0] }, error: null };
}

export async function incrementView(slug: string) {
  const { error } = await supabase.rpc("increment_blog_view", {
    post_slug: slug,
  });
  if (error) {
    return { data: null, error };
  }
  return { data: { success: true }, error: null };
}
