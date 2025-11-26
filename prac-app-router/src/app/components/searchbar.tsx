'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './serachbar.module.css';

export default function Searchbar() {
  const router = useRouter(); // App router에서는 'next/navigation'을 사용
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search.trim()) return;

    // Search 페이지로 이동
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    if (searchParams.get('q')) {
      setSearch(searchParams.get('q') || '');
    }
  }, [searchParams]);

  return (
    <div className={style.container}>
      <input type='text' placeholder='검색어를 입력해주세요...' value={search} onChange={onChange} />
      <button onClick={onSubmit} onKeyDown={onKeyDown}>
        검색
      </button>
    </div>
  );
}
