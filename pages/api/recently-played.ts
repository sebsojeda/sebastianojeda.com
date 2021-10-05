import type { NextApiRequest, NextApiResponse } from "next";
import { getRecentlyPlayed } from "../../lib/apple-music";

type ApiResponse = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  try {
    const response = await getRecentlyPlayed();
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
