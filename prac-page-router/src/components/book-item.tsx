import style from './book-item.module.css';
import { BookData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function BookItem({ id, title, subTitle, author, publisher, coverImgUrl }: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <Image src={coverImgUrl} alt={title} width={80} height={100} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
