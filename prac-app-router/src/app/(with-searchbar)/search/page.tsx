import BookItem from '@/app/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  return {
    title: `ONEBITE BOOKS - 검색 결과: ${q}`,
    description: `한입북스에 등록된 도서를 검색해보세요!`,
    openGraph: {
      title: `ONEBITE BOOKS - 검색 결과: ${q}`,
      description: `한입북스에 등록된 도서를 검색해보세요!`,
      images: ['/thumbnail.png'],
    },
    keywords: 'ONEBITE BOOKS, 도서, 책, 책 추천, 책 리뷰, 검색 결과',
  };
}

// export const dynamic = 'force-static'; //  무조건 static 페이지로 처리
// export const dynamic = 'error'; // 동적 요청 발생하면 빌드 에러
// Error occurred prerendering page "/search". Read more: https://nextjs.org/docs/messages/prerender-error

// dynamic page
export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  // console.log(q);

  // query string을 활용해서 이 컴포넌트는 static 페이지로 될 수 없음!
  // 하지만 api 요청에서 검색결과를 가져올 떄 캐싱을 적용해서 데이터 갱신을 방지할 수 있음! -> 최적화

  await delay(1500); // delay 1.5초 지연 -> loading test 용도
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`, { cache: 'force-cache' });
  if (!response.ok) {
    return <div>Failed to fetch books</div>;
  }
  const searchBooks: BookData[] = await response.json();

  return (
    <div>
      {searchBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
