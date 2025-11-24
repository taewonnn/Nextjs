// CSS Module 적용
// css 파일 이름을 클래스 이름으로 사용하는 방식
import style from "./index.module.css";

export default function Home() {
  return (
    <>
      {/** inline style */}
      <h1 style={{ color: "red" }}>index page</h1>

      {/** css module */}
      <h2 className={style.h2}>test</h2>
    </>
  );
}
