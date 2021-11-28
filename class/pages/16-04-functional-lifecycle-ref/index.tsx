import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function FunctionalLifecycleRefPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // componentDidMount와 동일
    console.log("그리기 완료!!!");
    inputRef.current?.focus();

    // componentWillUnmount와 동일
    return () => {
      console.log("잘가요~~");
    };
  }, []);

  // componentDidUpdate와 동일
  useEffect(() => {
    console.log("그려지고 난 뒤, 수정 완료!!");
  });

  const onClickCounter = () => {
    setCount((prev) => prev + 1);
  };

  const onClickMove = () => {
    router.push("/");
  };

  return (
    <>
      <div>클래스 컴포넌트입니다!!</div>
      <div>현재카운트: {count}</div>
      <button onClick={onClickCounter}>카운트 증가시키기!!</button>
      <button onClick={onClickMove}>페이지 이동하기!!!</button>
      <input type="text" ref={inputRef} />
    </>
  );
}
