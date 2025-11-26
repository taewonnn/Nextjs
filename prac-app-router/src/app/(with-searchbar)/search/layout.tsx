interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div>
      <div>
        <input type='text' placeholder='검색어를 입력해주세요...' />
        <button>검색</button>
      </div>
      {children}
    </div>
  );
}
