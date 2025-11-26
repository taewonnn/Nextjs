'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './serachbar.module.css';

export default function Searchbar() {
  const router = useRouter(); // App router에서는 'next/navigation'을 사용
  const searchParams = useSearchParams(); // 현재 페이지에 전달된 쿼리스트링 값을 가져올 수 있음
  const q = searchParams.get('q'); // 검색어 쿼리파라미터
  const [search, setSearch] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search.trim() || q === search) return;

    // Search 페이지로 이동
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    if (q || '') {
      setSearch(q || '');
    }
  }, [q]);

  return (
    <div className={style.container}>
      <input type='text' placeholder='검색어를 입력해주세요...' value={search} onChange={onChange} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
