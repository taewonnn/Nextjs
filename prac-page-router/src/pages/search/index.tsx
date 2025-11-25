import BookItem from '@/components/book-item';
import SearchableLayout from '../../components/searchable-layout';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';

// ✅ server side props
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log(context.query); // { q: 'test' } 브라우저의 쿼리스트링 가져올 수 있어

  const { q } = context.query;

  const books = await fetchBooks(q as string);
  console.log('books', books);

  return { props: { books } };
};

// ✅ static props -> Query string 값을 가져올 수 없기에 SSG방식으로는 불가능!
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   // 빌드 타임에 딱 한 번 실행하다 보니 queryString 값을 가져올 수 없어! => SSG방식으로는 불가능!
//   const { q } = context.params;
//   const books = await fetchBooks(q as string);
//   return { props: { books } };
// };

export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{books.length === 0 ? <div>검색 결과가 없습니다...</div> : books.map((book: BookData) => <BookItem key={book.id} {...book} />)}</div>;
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
