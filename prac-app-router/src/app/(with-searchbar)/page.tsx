import { BookData } from '@/types';
import BookItem from '../components/book-item';
import style from './page.module.css';
// import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '../components/skeleton/book-list-skeleton';
import { Metadata } from 'next';

// 특정 페이지의 유형을 강제로 static 또는 dynamic으로 설정할 수 있음!
// export const dynamic = 'auto'           // 기본값
// export const dynamic = 'force-dynamic'  // 항상 SSR
// export const dynamic = 'force-static'   // 항상 SSG
// export const dynamic = 'error'          // 동적 요청 발생하면 빌드 에러
// export const dynamic = 'force-dynamic';

async function AllBooks() {
  // await delay(1500); // delay 1.5초 지연 -> suspense test 용도
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, { cache: 'force-cache' });
  if (!response.ok) {
    return <div>Failed to fetch books</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 강제로 동적 페이지로 설정
// export const dynamic = 'force-dynamic';

async function RecoBooks() {
  // await delay(3000); // delay 3초 지연 -> suspense test 용도
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/random`, { next: { revalidate: 3 } });
  if (!response.ok) {
    return <div>Failed to fetch random books</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'ONEBITE BOOKS',
  description: '한입북스에 등록된도서를 만나보세요!',
  openGraph: {
    title: 'ONEBITE BOOKS',
    description: '한입북스에 등록된도서를 만나보세요!',
    images: ['/thumbnail.png'],
  },
  keywords: 'ONEBITE BOOKS, 도서, 책, 책 추천, 책 리뷰',
};

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
