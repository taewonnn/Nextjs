import BookItem from '@/app/components/book-item';
import { BookData } from '@/types';

// export const dynamic = 'force-static'; //  무조건 static 페이지로 처리
// export const dynamic = 'error'; // 동적 요청 발생하면 빌드 에러
// Error occurred prerendering page "/search". Read more: https://nextjs.org/docs/messages/prerender-error

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  // console.log(q);

  // query string을 활용해서 이 컴포넌트는 static 페이지로 될 수 없음!
  // 하지만 api 요청에서 검색결과를 가져올 떄 캐싱을 적용해서 데이터 갱신을 방지할 수 있음! -> 최적화
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
