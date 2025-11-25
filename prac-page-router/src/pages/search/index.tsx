import BookItem from '@/components/book-item';
import SearchableLayout from '../../components/searchable-layout';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log(context.query); // { q: 'test' } 브라우저의 쿼리스트링 가져올 수 있어

  const { q } = context.query;

  const books = await fetchBooks(q as string);
  console.log('books', books);

  return { props: { books } };
};

export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{books.length === 0 ? <div>검색 결과가 없습니다...</div> : books.map((book: BookData) => <BookItem key={book.id} {...book} />)}</div>;
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
