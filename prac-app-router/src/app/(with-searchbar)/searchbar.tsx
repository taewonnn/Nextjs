'use client';

import { useState } from 'react';

export default function Searchbar() {
  const [search, setSearch] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search.trim()) return;
  };

  return (
    <div>
      <input type='text' placeholder='검색어를 입력해주세요...' value={search} onChange={onChange} />
      <button>검색</button>
    </div>
  );
}
