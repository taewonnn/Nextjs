import { Suspense } from 'react';
import Searchbar from '../components/searchbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Suspense(미결) -> 비동기 처리 시 로딩 상태를 관리하는 컴포넌트 */}
      {/* Suspense 안에 컴포넌트는 서버 측 사전 렌더링에서는 배제됨! 오직 클라이언트 사이드에서만 동작! */}
      <Suspense fallback={<div>로딩 중...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
