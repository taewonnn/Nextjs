import style from './index.module.css';
import SearchableLayout from '../components/searchable-layout';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import fetchRandomBooks from '@/lib/fetch-random-books';
// import { useEffect } from 'react';

// Server Side Rendering - getServerSideProps => 컴포넌트 props 타입은 InferGetServerSidePropsType<typeof getServerSideProps>
// 이 함수는 서버에서 실행되어, 클라이언트에 전달되는 데이터를 미리 불러오는 함수!
// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 미리 불러오는 함수!
// export const getServerSideProps = async () => {
//   console.log('!!server side props'); // terminal log에 출력
//   const data = 'hello';
//   return {
//     // props는 무조건 객체로 반환해야 함!
//     props: { data },
//   };
// };

// SSG - getStaticProps   => 컴포넌트 props 타입은 InferGetStaticPropsType<typeof getStaticProps>
// 이 함수는 빌드 시 실행되어, 클라이언트에 전달되는 데이터를 미리 불러오는 함수!
// 빌드 시 실행되어, 클라이언트에 전달되는 데이터를 미리 불러오는 함수!
// export const getStaticProps = async () => {
//   console.log('인덱스 페이지');
//   const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

//   return {
//     props: { allBooks, randomBooks },
//   };
// };

// SSR
export const getServerSideProps = async () => {
  // 모든 책 API
  // const allBooks = await fetchBooks();
  // const randomBooks = await fetchRandomBooks();

  // Promise.all -> 모든 요청이 완료될 때까지 기다리고, 모든 요청이 완료된 후 결과를 반환한다.
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  // console.log('randomBooks', randomBooks);

  return {
    props: { allBooks, randomBooks },
  };
};

export default function Home({ allBooks, randomBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // winodw.location -> 에러나는 이유 -> 서버에서 실행되기 때문에, 서버에서 실행되면 에러가 난다.
  // useEffect(() => {
  //   console.log(window);
  // }, []);

  // console.log('data', allBooks);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book: BookData) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book: BookData) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
