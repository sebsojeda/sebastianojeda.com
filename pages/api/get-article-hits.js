import prisma from "../../lib/prisma";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const slug = req.query.slug;
  if (slug instanceof Array || !slug) {
    return res.status(400).json({ message: "invalid or missing query 'slug'" });
  }

  const views = await prisma.postViews.findUnique({ where: { slug } });
  if (!views) {
    return res.status(400).json({ message: "slug not found" });
  }

  return res.status(200).json({
    hits: views.views,
  });
}
