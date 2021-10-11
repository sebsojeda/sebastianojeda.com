import { supabase } from "./supabase";

export async function getLikesBySlug(slug: string) {
  const { count, error } = await supabase
    .from("likes_by_user")
    .select("*", { count: "exact" })
    .eq("slug", slug);
  if (error) {
    return { data: null, error };
  }
  if (!count) {
    return { data: { count: 0 }, error: null };
  }
  return { data: { count }, error: null };
}

export async function hasLikeByUser(ipHash: string, slug: string) {
  const { data, error } = await supabase
    .from("likes_by_user")
    .select("*")
    .match({ ip_hash: ipHash, slug });
  if (error) {
    return { data: null, error };
  }
  if (!data) {
    return { data: null, error: new Error("Unable to get like by user") };
  }
  if (data.length === 0) {
    return { data: { likedByUser: false }, error: null };
  }
  return { data: { likedByUser: true }, error: null };
}

export async function createLikeByUser(ipHash: string, slug: string) {
  const { data, error } = await supabase
    .from("likes_by_user")
    .insert([{ ip_hash: ipHash, slug }]);
  if (error) {
    return { data: null, error };
  }
  if (!data || data.length === 0) {
    return { data: null, error: new Error("Unable to create like by user") };
  }
  return { data: { ...data[0] }, error: null };
}
