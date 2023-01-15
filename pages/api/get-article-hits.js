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
        const views = await prisma.postViews.findUniqueOrThrow({
          // @ts-ignore
          where: { slug },
        });
        res.status(200).json({ hits: views.views });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ message: "error fetching article hits" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
