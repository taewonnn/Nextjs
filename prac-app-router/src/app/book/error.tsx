'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h3>Error</h3>
      <p>{error.message}</p>
      <button onClick={() => reset()}>retry </button>
      <button
        onClick={() => {
          // startTransition -> callback 안에 함수들을 일괄적으로 동시에 처리해줌
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
            reset(); // 에러 상태 초기화 + 컴포넌트를 다시 렌더링하는 역할
          });
        }}
      >
        reload
      </button>
      <br />
      <button onClick={() => router.back()}>back to previous page</button>
    </div>
  );
}
