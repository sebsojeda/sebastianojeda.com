import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";
import { ApiError } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiError | null>
) {
  if (req.method === "POST") {
    const email = req.body.email;
    await supabase.auth.api.sendMagicLinkEmail(email, {
      redirectTo: `${process.env.APP_URL}/admin`,
    });
    res.status(204).send(null);
  } else {
    res
      .status(405)
      .json({ error: { status: 405, message: "Method Not Allowed" } });
  }
}
