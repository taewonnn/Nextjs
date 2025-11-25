import style from './index.module.css';
import SearchableLayout from '../components/searchable-layout';
import books from '@/mock/book.json';
import BookItem from '@/components/book-item';
import { useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';

// 이 함수는 서버에서 실행되어, 클라이언트에 전달되는 데이터를 미리 불러오는 함수!
// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 미리 불러오는 함수!
export const getServerSideProps = async () => {
  console.log('!!server side props'); // terminal log에 출력
  const data = 'hello';
  return {
    // props는 무조건 객체로 반환해야 함!
    props: { data },
  };
};

export default function Home({ data }: { data: InferGetServerSidePropsType<typeof getServerSideProps> }) {
  console.log('몇 번 출력?', data);

  // winodw.location -> 에러나는 이유 -> 서버에서 실행되기 때문에, 서버에서 실행되면 에러가 난다.

  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        {books.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
