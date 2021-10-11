import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { getLikesBySlug, hasLikeByUser } from "../../lib/blog-likes";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  if (req.method === "GET") {
    const ip = req.headers["x-real-ip"]?.toString() ?? "";
    const ipHash = crypto.createHash("sha1").update(ip).digest("base64");
    const slug = req.query.slug?.toString() ?? "";
    const { data: likes, error: likesError } = await getLikesBySlug(slug);
    if (likesError) {
      res.status(500).json({
        error: { status: 500, message: likesError.message },
      });
    }
    const { data: hasLiked, error: hasLikedError } = await hasLikeByUser(
      ipHash,
      slug
    );
    if (hasLikedError) {
      res.status(500).json({
        error: { status: 500, message: hasLikedError.message },
      });
    }
    res.status(200).json({
      data: { likes: likes?.count, hasLiked: hasLiked?.likedByUser },
    });
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
