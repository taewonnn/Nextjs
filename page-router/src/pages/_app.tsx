import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * App 컴포넌트는 모든 페이지의 공통 레이아웃을 정의하는 역할
 * @param Component -> page 역할
 * @param pageProps -> page의 props (컴포넌트에 전달되는 데이터)
 * @returns -> page 컴포넌트를 렌더링
 */

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
  };

  return (
    <>
      <header>
        <Link href="/">Home</Link>&nbsp;
        <Link href="/search">Search</Link>&nbsp;
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
