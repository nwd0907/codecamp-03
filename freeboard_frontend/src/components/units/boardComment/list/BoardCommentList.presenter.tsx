import BoardCommentListUIItem from "./BoardCommentList.presenterItem";

export default function BoardCommentListUI(props) {
  return (
    <>
      {props.data?.fetchBoardComments.map((data) => (
        <BoardCommentListUIItem key={data._id} data={data} />
      ))}
    </>
  );
}
