import prisma from "./prisma";

export async function getViewsBySlug(slug: string) {
  const data = await prisma.postViews.findFirst({ where: { slug } });
  if (!data) {
    return { data: null, error: new Error("Unable to get page views") };
  }
  return { data: { ...data }, error: null };
}

export async function incrementView(slug: string) {
  const data = await prisma.postViews.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  if (!data) {
    return { data: null, error: new Error("Unable to increment page views") };
  }
  return { data: { success: true }, error: null };
}
