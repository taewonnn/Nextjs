import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  console.log(router);

  // test: http://localhost:3000/?page=123
  const { page } = router.query;

  return <div>Search page : {page}</div>;
}
