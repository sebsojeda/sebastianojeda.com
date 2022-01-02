import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  if (req.method === "GET") {
    const ip = req.headers["x-real-ip"]?.toString() ?? "";
    const ipHash = crypto.createHash("sha1").update(ip).digest("base64");
    const slug = req.query.slug?.toString() ?? "";
    const { data: likes, error: likesError } = {
      data: {},
      error: null,
    };
    if (!likes || likesError) {
      res.status(500).json({
        error: { status: 500, message: "" },
      });
      return;
    }
    const { data: hasLiked, error: hasLikedError } = {
      data: {},
      error: null,
    };
    if (!hasLiked || hasLikedError) {
      res.status(500).json({
        error: { status: 500, message: "" },
      });
      return;
    }
    res.status(200).json({
      data: { likes: 0, hasLiked: false },
    });
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
