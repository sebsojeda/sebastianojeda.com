import type { NextApiRequest, NextApiResponse } from "next";
import { getRecentlyPlayed } from "../../lib/apple-music";
import { ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const response = await getRecentlyPlayed();
    if (response.data.length == 0) {
      res.status(200).json({
        data: null,
      });
    }
    const { attributes } = response.data[0];
    res.status(200).json({
      data: {
        artwork: `${attributes.artwork.url}`.replace(/\/{w}x{h}bb.jpg/g, ""),
        artistName: attributes.artistName,
        name: attributes.name,
        albumName: attributes.albumName,
        url: attributes.url,
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
