import crypto from "crypto";
import prisma from "../../lib/prisma";

/**
 * Likes a post using a `sha1` hash of the request IP. Not the most reliable way
 * of doing things, but suitable for our purposes.
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const slug = req.body.slug;
  if (!slug) {
    return res.status(400).json({ message: "missing attribute 'slug'" });
  }

  const ip = req.headers["x-real-ip"];
  if (ip instanceof Array || !ip) {
    return res.status(400).json({ message: "unable to get client IP address" });
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
  if (hasLiked) {
    return res.status(400).json({ message: "post has already been liked" });
  }

  await prisma.postLikes.create({
    data: {
      slug,
      ipHash,
    },
  });

  return res.status(200).json({ message: "ok" });
}
