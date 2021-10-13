import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDeveloperToken,
  createDeveloperToken,
  deleteDeveloperToken,
} from "../../lib/apple-music";
import { supabase } from "../../lib/supabase";
import { ApiError, ApiResponse } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError | null>
) {
  const token = req.headers.token?.toString() ?? "";
  const { user, error } = await supabase.auth.api.getUser(token);
  if (error || !user) {
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
  } else if (req.method === "POST") {
    const { data, error } = await createDeveloperToken();
    if (error) {
      res.status(500).json({ error: { status: 500, message: error.message } });
    } else {
      res.status(200).json({
        data: { ...data },
      });
    }
  } else if (req.method === "DELETE") {
    const { error } = await deleteDeveloperToken();
    if (error) {
      res.status(500).json({
        error: { status: 500, message: error.message },
      });
    } else {
      res.status(204).send(null);
    }
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
