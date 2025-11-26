export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>로고</h1>
      {children}
    </div>
  );
}
