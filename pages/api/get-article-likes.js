import crypto from "crypto";
import prisma from "../../lib/prisma";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "method not allowed" });
    return;
  }

  const slug = req.query.slug;
  if (slug instanceof Array || !slug) {
    res.status(400).json({ message: "invalid or missing query 'slug'" });
    return;
  }

  const ip = req.headers["x-real-ip"];
  if (ip instanceof Array || !ip) {
    res.status(400).json({ message: "unable to get client IP address" });
    return;
  }

  const ipHash = crypto.createHash("sha1").update(ip).digest("base64");
  const hasLiked = await prisma.postLikes.findUnique({
    where: {
      slug_ipHash: {
        slug,
        ipHash,
      },
    },
  });

  const likes = await prisma.postLikes.count({ where: { slug } });

  res.status(200).json({
    likes,
    hasLiked: !!hasLiked,
  });
}
