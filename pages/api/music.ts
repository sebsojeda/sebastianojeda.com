import type { NextApiRequest, NextApiResponse } from "next";
import {
  createMusicUserToken,
  deleteMusicUserToken,
  getDeveloperToken,
  getMusicUserToken,
} from "../../lib/apple-music";
import { supabase } from "../../lib/supabase";
import { ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | null>
) {
  const token = req.headers.token;
  if (
    (await supabase.auth.api.getUser(token as string)).user?.role !==
    "authenticated"
  ) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method == "GET") {
      const musicUserToken = await getMusicUserToken();
      const developerToken = await getDeveloperToken();
      res.status(200).json({ data: [developerToken, musicUserToken] });
    } else if (req.method == "POST") {
      const response = await createMusicUserToken(req.body.token);
      res.status(201).json({ data: response });
    } else if (req.method == "DELETE") {
      await deleteMusicUserToken();
      res.status(204).send(null);
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
