import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useEffect } from "react";

/**
 * App 컴포넌트는 모든 페이지의 공통 레이아웃을 정의하는 역할
 * @param Component -> page 역할
 * @param pageProps -> page의 props (컴포넌트에 전달되는 데이터)
 * @returns -> page 컴포넌트를 렌더링
 */

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  /** pre-fetching */
  // 처음 페이지 로드 시 해당 페이지에서 이동가능할만한 페이지를 미리 js 파일로 로드해놓고, 바로 이동이 가능하도록 해줌

  const onClickButton = () => {
    // pre-fetching 적용 X, 페이지 이동 시 새로고침 발생
    router.push("/test");
  };

  // test 페이지 미리 로드하도록 적용 가능하지만, 초기 렌더링 시간이 길어질 수 있음
  // useEffect(() => {
  //   router.prefetch("/test");
  // }, []);

  return (
    <>
      <header>
        {/* Link -> 자동으로 pre-fetching 적용 */}
        <Link href="/">Home</Link>&nbsp;
        <Link href="/search" prefetch={false}>
          Search
        </Link>
        &nbsp;
        <Link href="/book/123">Book 123</Link>
        <div>
          <button onClick={onClickButton}>/test page 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
      <footer>global footer</footer>
    </>
  );
}
