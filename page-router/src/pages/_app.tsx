import "@/styles/globals.css";
import type { AppProps } from "next/app";

/**
 * App 컴포넌트는 모든 페이지의 공통 레이아웃을 정의하는 역할
 * @param Component -> page 역할
 * @param pageProps -> page의 props (컴포넌트에 전달되는 데이터)
 * @returns -> page 컴포넌트를 렌더링
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>global header</header>
      <Component {...pageProps} />  
      <footer>global footer</footer>
    </>
  );
}
