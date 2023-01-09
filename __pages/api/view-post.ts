import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError, ApiResponse } from "../../lib/types";
import { incrementView } from "../../lib/blog-views";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  if (req.method === "POST") {
    const slug = req.body.slug;
    const { data, error } = await incrementView(slug);
    if (error) {
      res.status(500).json({
        error: { status: 500, message: error.message },
      });
    } else {
      res.status(200).json({ data: { ...data } });
    }
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
