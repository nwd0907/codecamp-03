import { useState } from "react";

export default function StatePrevPage() {
  const [count, setCount] = useState(0);

  function onClickButton() {
    setCount((qwlkelkasfjkldjkl) => {
      // const aaa = 33;
      // let bbb = 22;
      // 아무로직 쓰기

      return qwlkelkasfjkldjkl + 1;
    });
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickButton}>+1</button>
    </>
  );
}
