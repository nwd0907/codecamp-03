const children = ["철수", "영희", "훈이"];

type aaa = typeof children[number];

export default function HofPage() {
  function onClickFunction(ggg) {
    return () => {
      alert(`${event.target.id}번째 입니다.`);
    };
  }

  const onClickFunction2 = (ggg: typeof children[number]) => (event) => {
    alert(`${ggg}번째 입니다.`);
  };

  return (
    <>
      <div>HOF 연습 페이지입니다</div>
      {children.map((el) => (
        <div key={el} onClick={onClickFunction(el)}>
          {el}입니다.
        </div>
      ))}
    </>
  );
}

const boards = {
  등록하기: "/boards/new",
} as const;

function getUrl<T, K extends keyof T>(page: T, key: K): T[K] {
  return page[key];
}

const url = getUrl(boards, "등록하기");
router.push(url);
