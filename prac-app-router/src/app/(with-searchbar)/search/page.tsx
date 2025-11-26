import books from '@/mock/book.json';
import BookItem from '@/app/components/book-item';

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;

  console.log(q);
  return (
    <div>
      {books.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
