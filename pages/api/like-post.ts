import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { createLikeByUser } from "../../lib/blog-likes";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  if (req.method === "POST") {
    const ip = req.headers["x-real-ip"]?.toString() ?? "";
    const ipHash = crypto.createHash("sha1").update(ip).digest("base64");
    const slug = req.body.slug;
    const { data, error } = await createLikeByUser(ipHash, slug);
    if (error) {
      res.status(500).json({
        error: { status: 500, message: error.message },
      });
    } else {
      res.status(201).json({ data: { ...data } });
    }
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
