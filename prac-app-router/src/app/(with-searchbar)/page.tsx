import { BookData } from '@/types';
import BookItem from '../components/book-item';
import style from './page.module.css';

// 특정 페이지의 유형을 강제로 static 또는 dynamic으로 설정할 수 있음!
// export const dynamic = 'auto'           // 기본값
// export const dynamic = 'force-dynamic'  // 항상 SSR
// export const dynamic = 'force-static'   // 항상 SSG
// export const dynamic = 'error'          // 동적 요청 발생하면 빌드 에러
// export const dynamic = 'force-dynamic';

async function AllBooks() {
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

async function RecoBooks() {
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

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
