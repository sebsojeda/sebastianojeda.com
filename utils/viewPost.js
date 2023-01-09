import prisma from "../lib/prisma";

/**
 *
 * @param {string} slug
 */
export default async function viewPost(slug) {
  return prisma.postViews.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
