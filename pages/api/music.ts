import type { NextApiRequest, NextApiResponse } from "next";
import {
  createMusicUserToken,
  deleteMusicUserToken,
  getMusicTokens,
} from "../../lib/apple-music";
import { supabase } from "../../lib/supabase";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError | null>
) {
  const token = req.headers.token;
  const { user, error } = await supabase.auth.api.getUser(token as string);
  if (error) {
    res.status(500).json({
      errors: [{ status: 500, message: error.message }],
    });
  }
  if (!user) {
    res
      .status(401)
      .json({ errors: [{ status: 401, message: "Unauthorized" }] });
  }
  if (req.method == "GET") {
    const { data, error } = await getMusicTokens();
    if (error) {
      res
        .status(500)
        .json({ errors: [{ status: 500, message: error.message }] });
    }
    res.status(200).json({
      data: [
        { attributes: { developerToken: data?.developerToken } },
        { attributes: { musicUserToken: data?.musicUserToken } },
      ],
    });
  } else if (req.method == "POST") {
    const { data, error } = await createMusicUserToken(req.body.token);
    if (error) {
      res.status(500).json({
        errors: [{ status: 500, message: error.message }],
      });
    }
    res.status(201).json({ data: [{ attributes: { ...data } }] });
  } else if (req.method == "DELETE") {
    const { error } = await deleteMusicUserToken();
    if (error) {
      res.status(500).json({
        errors: [{ status: 500, message: error.message }],
      });
    }
    res.status(204).send(null);
  } else {
    res
      .status(405)
      .json({ errors: [{ status: 405, message: "Method Not Allowed" }] });
  }
}
