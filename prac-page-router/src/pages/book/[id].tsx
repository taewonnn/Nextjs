import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import Image from 'next/image';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params!;
  console.log('server -', id);

  const book = await fetchOneBook(Number(id));

  return { props: { book } };
};

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return <div>Book not found</div>;

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div style={{ backgroundImage: `url(${coverImgUrl})` }} className={style.cover_img_container}>
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
