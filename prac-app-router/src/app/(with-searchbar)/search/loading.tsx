// 비동기 처리하는 page에 한해서 로딩 상태라면 아래 컴포넌트를 보여줘
// 무조건 page 컴포넌트에만 적용 가능 / layout이나 일반 컴포넌트에는 적용 불가!!(컴포넌트 단위에는 Loading.tsx 대신 suspense를 활용)
// 페이지 이동이 아닌 쿼리스트링만 바뀌는 경우에는 적용 불가!
export default function Loading() {
  return <div>Loading...</div>;
}
