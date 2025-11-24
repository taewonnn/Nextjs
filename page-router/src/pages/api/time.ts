import type { NextApiRequest, NextApiResponse } from "next";

// http://localhost:3000/api/time -> { time: "12:00:00" }
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();

  res.json({ time: date.toLocaleTimeString() });
}
