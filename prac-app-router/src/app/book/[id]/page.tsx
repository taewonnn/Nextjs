import Image from 'next/image';
import style from './page.module.css';
import { BookData } from '@/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { createReviewAction } from '@/actions/create-review.action';

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`);
  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }
    return <div>Failed to fetch book</div>;
  }

  const book: BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <Image src={coverImgUrl} alt={title} width={80} height={100} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        <input hidden name='bookId' value={bookId} readOnly />
        <input type='text' name='content' placeholder='review content' required />
        <input type='text' name='author' placeholder='author' required />
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
}

// 동적 페이지를 미리 static하게 생성
// 빌드 타임에 파라미터를 미리 알려주고 정적 페이지로 미리 생성해두는 함수
// 3번까지만 정적으로 만들어두고, book/4로 들어가면 -> dynamic으로 처리( 한 번 만들어지면 Full Route Cache 적용되어 다시 요청 X)
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <BookDetail bookId={id} />
      </Suspense>

      <ReviewEditor bookId={id} />
    </div>
  );
}
