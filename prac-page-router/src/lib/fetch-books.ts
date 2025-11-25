import { BookData } from '@/types';

/** 모든 책 가져오기 API */
export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = 'http://localhost:12345/book';

  if (q) {
    url = `${url}/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
