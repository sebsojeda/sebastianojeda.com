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
    res.status(405).json({ message: "method not allowed" });
    return;
  }

  const slug = req.body.slug;
  if (!slug) {
    res.status(400).json({ message: "missing attribute 'slug'" });
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
  if (hasLiked) {
    res.status(400).json({ message: "post has already been liked" });
    return;
  }

  await prisma.postLikes.create({
    data: {
      slug,
      ipHash,
    },
  });

  res.status(200).json({ message: "ok" });
}
