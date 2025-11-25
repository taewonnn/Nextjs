import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/'); // 재검증 하고자하는 페이지 경로
    return res.json({ revalidated: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to revalidate' });
  }
}
