import { Html, Head, Main, NextScript } from "next/document";

/**
 * font / characterset / viewport / 기본 스타일 등 문서 수준의 설정을 정의하는 역할
 * Document 컴포넌트는 모든 페이지의 공통 레이아웃을 정의하는 역할
 * @returns -> HTML 문서 구조를 정의하는 컴포넌트
 */

export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
