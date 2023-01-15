import crypto from "crypto";
import prisma from "../../lib/prisma";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { slug } = req.query;
        const ip = req.headers["x-real-ip"];
        // @ts-ignore
        const ipHash = crypto.createHash("sha1").update(ip).digest("base64");
        const hasLiked = await prisma.postLikes.findUnique({
          where: {
            slug_ipHash: {
              // @ts-ignore
              slug,
              ipHash,
            },
          },
        });
        // @ts-ignore
        const likes = await prisma.postLikes.count({ where: { slug } });
        res.status(200).json({
          likes,
          hasLiked: !!hasLiked,
        });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ message: "error fetching article likes" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
