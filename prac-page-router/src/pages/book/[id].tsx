import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import Image from 'next/image';
import { useRouter } from 'next/router';

/** ✅ SSG - 동적 페이지 적용 방법
빌드 타임에서 미리 만들어둬야하는데, 동적 페이지는 id가 몇 번까지 있는지 알아야 만들어!
그래서 getStaticPaths 함수를 사용해서 미리 만들어둬야 함!
fallback 상태 -> 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태!

fallback -> true -> 존재 하지 않는 페이지로 요청하면 -> 즉시 생성 + (데이터가 없는)페이지만 미리 반환 이후에 서버 데이터 받아와서 페이지 변환
fallback -> false -> 빌드 타임에 미리 만들어둔 페이지만 허용 / 존재하지 않는 페이지로 요청하면 없는 페이지로 취급! => 404
fallback -> blocking -> 존재 하지 않는 페이지로 요청하면 -> 즉시 생성(like SSR)
*/

// export const getStaticPaths = () => {
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
//     fallback: false, // 빌드 타임에 미리 만들어둔 페이지만 허용
//   };
// };

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const { id } = context.params!;
//   console.log('static -', id);

//   const book = await fetchOneBook(Number(id));

// if (!book) {
//   return { notFound: true };
// }

//   return { props: { book } };
// };

// ✅ SSR
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params!;
  console.log('server -', id);

  const book = await fetchOneBook(Number(id));

  return { props: { book } };
};

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  // fallback 상태 -> 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태!
  // fallback 상태일 때 미리 반환된 페이지 표시
  if (router.isFallback) return <div>Loading...</div>;

  // 데이터가 없는 경우 404 페이지 표시
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
