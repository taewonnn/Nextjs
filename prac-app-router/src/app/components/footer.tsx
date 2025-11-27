import { BookData } from '@/types';

export default async function Footer() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      return <footer>제작 @taewon</footer>;
    }

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return <footer>제작 @taewon | {bookCount}권의 도서가 등록되어 있습니다.</footer>;
  } catch (error) {
    console.error('Footer fetch error:', error);
    return <footer>제작 @taewon</footer>;
  }
}
