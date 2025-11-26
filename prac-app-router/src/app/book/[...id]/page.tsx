import Image from 'next/image';
import style from './page.module.css';
import { BookData } from '@/types';

export default async function Page({ params }: { params: Promise<{ id: string | string[] }> }) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id[0]}`);
  if (!response.ok) {
    return <div>Failed to fetch book</div>;
  }

  const book: BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <Image src={coverImgUrl} alt={title} width={80} height={100} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
