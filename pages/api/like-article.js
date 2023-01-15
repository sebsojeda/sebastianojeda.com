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
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { slug } = req.body;
        const ip = req.headers["x-real-ip"];
        // @ts-ignore
        const ipHash = crypto.createHash("sha1").update(ip).digest("base64");
        await prisma.postLikes.create({
          data: {
            slug,
            ipHash,
          },
        });
        res.status(200).json({ message: "ok" });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ message: "error liking article" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
