// import {  } from "./";

export async function getLikesBySlug(slug: string) {
  const { count, error } = { count: 0, error: null };
  if (error) {
    return { data: null, error };
  }
  if (!count) {
    return { data: { count: 0 }, error: null };
  }
  return { data: { count }, error: null };
}

export async function hasLikeByUser(ipHash: string, slug: string) {
  const { data, error } = { data: {}, error: null };
  if (error) {
    return { data: null, error };
  }
  if (!data) {
    return { data: null, error: new Error("Unable to get like by user") };
  }
  if (!data) {
    return { data: { likedByUser: false }, error: null };
  }
  return { data: { likedByUser: true }, error: null };
}

export async function createLikeByUser(ipHash: string, slug: string) {
  const { data, error } = { data: {}, error: null };
  if (error) {
    return { data: null, error };
  }
  if (!data) {
    return { data: null, error: new Error("Unable to create like by user") };
  }
  return { data: { ...data }, error: null };
}
