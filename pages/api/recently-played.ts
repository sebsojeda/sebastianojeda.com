import type { NextApiRequest, NextApiResponse } from "next";
import { getRecentlyPlayed } from "../../lib/apple-music";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  const { data, error } = await getRecentlyPlayed();
  if (error) {
    res.status(500).json({
      errors: [{ status: 500, message: error.message }],
    });
  }
  if (data.length === 0) {
    res.status(200).json({
      data: [],
    });
  }
  const { attributes } = data[0];
  res.status(200).json({
    data: [
      {
        attributes: {
          artwork: `${attributes.artwork.url}`.replace(/\/{w}x{h}bb.jpg/g, ""),
          artistName: attributes.artistName,
          name: attributes.name,
          albumName: attributes.albumName,
          url: attributes.url,
        },
      },
    ],
  });
}
