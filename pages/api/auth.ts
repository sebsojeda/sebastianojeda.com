import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null>
) {
  const email = req.body.email;
  await supabase.auth.api.sendMagicLinkEmail(email, {
    redirectTo: `${process.env.APP_URL}/admin`,
  });
  res.status(204).send(null);
}
