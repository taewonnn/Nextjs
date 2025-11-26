import { Suspense } from 'react';
import Searchbar from '../components/searchbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
