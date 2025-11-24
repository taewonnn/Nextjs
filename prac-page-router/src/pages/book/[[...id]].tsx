import { useRouter } from 'next/router';

//[]
// [id].tsx -> localhost:3000/book/123 -> Arr[123]

//[...id]
// [...id].tsx -> localhost:3000/book/123/456 -> Arr[123, 456]
// [...id].tsx -> localhost:3000/book -> 404 Error

// optional catch all segment
// [[...id]]
// [[...id]].tsx -> localhost:3000/book/123/456 -> Arr[123, 456]
// [[...id]].tsx -> localhost:3000/book -> 대응 가능

export default function Page() {
  const router = useRouter();
  console.log(router);

  const { id } = router.query;

  return <div>Book page / book id :{id}</div>;
}
