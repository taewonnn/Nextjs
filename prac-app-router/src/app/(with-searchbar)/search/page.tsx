import BookItem from '@/app/components/book-item';
import { BookData } from '@/types';

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  // console.log(q);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`);
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
