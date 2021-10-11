import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null>
) {
  console.log(req.headers);
  res.status(204).send(null);
}
