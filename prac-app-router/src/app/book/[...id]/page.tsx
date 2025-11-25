export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log(id); // 배열로 내려옴
  return <div>Book/id page - {id[0]}</div>;
}
