import { useEffect, useState } from "react";

export default function DependencyArrayPage() {
  const [count, setCount] = useState(1);

  // useEffect에서 setState를 사용하면 추가적인 렌더링 발생
  // useEffect(() => {
  //   console.log("카운트가 변경될때마다 실행됨!!!");
  //   setCount((prev) => prev + 1);
  // }, []);

  // useEffect에서 setState와 dependency-array를 잘못 사용하여 발생하는 무한루프
  // useEffect(() => {
  //   console.log("카운트가 변경될때마다 실행됨!!!");
  //   setCount((prev) => prev + 1);
  // }, [count]);

  useEffect(() => {
    console.log("렌더링됨!!!");
  });

  const onClickCounter = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div>현재카운트: {count}</div>
      <button onClick={onClickCounter}>카운트 증가시키기!!</button>
    </>
  );
}
