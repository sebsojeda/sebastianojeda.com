import type { NextApiRequest, NextApiResponse } from "next";
import { getRecentlyPlayed } from "../../lib/apple-music";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  if (req.method === "GET") {
    const { data, error } = await getRecentlyPlayed();
    if (error) {
      res.status(500).json({
        error: { status: 500, message: error.message },
      });
    } else if (!data) {
      res.status(200).json({
        data: null,
      });
    } else {
      res.status(200).json({
        data: {
          artwork: `${data.artwork.url}`.replace(/\/{w}x{h}bb.jpg/g, ""),
          artistName: data.artistName,
          name: data.name,
          albumName: data.albumName,
          url: data.url,
        },
      });
    }
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
