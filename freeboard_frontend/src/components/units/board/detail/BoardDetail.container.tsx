import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import BoardDetailUI from "./BoardDetail.presenter";
import {
  FETCH_BOARD,
  DELETE_BOARD,
  LIKE_BOARD,
  DISLIKE_BOARD,
} from "./BoardDetail.queries";

export default function BoardDetail() {
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [likeBoard] = useMutation(LIKE_BOARD);
  const [dislikeBoard] = useMutation(DISLIKE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  function onClickMoveToList() {
    router.push("/boards");
  }

  function onClickMoveToEdit() {
    router.push(`/boards/${router.query.boardId}/edit`);
  }

  async function onClickDelete() {
    try {
      await deleteBoard({ variables: { boardId: router.query.boardId } });
      alert("게시물이 삭제되었습니다.");
      router.push("/boards");
    } catch (error) {
      alert(error.message);
    }
  }

  function onClickLike() {
    likeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.boardId } },
      ],
    });
  }

  function onClickDislike() {
    dislikeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.boardId } },
      ],
    });
  }

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToList={onClickMoveToList}
      onClickMoveToEdit={onClickMoveToEdit}
      onClickDelete={onClickDelete}
      onClickLike={onClickLike}
      onClickDislike={onClickDislike}
    />
  );
}
