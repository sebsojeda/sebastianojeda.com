import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getDeveloperToken } from "../../lib/apple-music";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError | null>
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
  } else if (req.method === "GET") {
    const { data, error } = await getDeveloperToken();
    if (error) {
      res.status(500).json({ error: { status: 500, message: error.message } });
    } else {
      res.status(200).json({
        data: { ...data },
      });
    }
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
