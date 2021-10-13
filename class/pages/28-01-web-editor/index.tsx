import { useMutation, gql } from "@apollo/client";
// import { Modal } from "antd";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// import ReactQuill from "react-quill"; // 프론트엔드 서버에서 그릴 때, document가 없어서 문제가 됨!!

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function WebEditorPage() {
  const router = useRouter();
  const { handleSubmit, register, setValue, trigger } = useForm({
    mode: "onChange",
  });
  const [createBoard] = useMutation(CREATE_BOARD);

  async function onClickMyButton(data) {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      router.push(`/28-02-web-editor-detail/${result.data.createBoard._id}`);
    } catch (error) {
      // Modal.error('')
      console.log(error);
    }
  }

  function onChangeMyEditor(value) {
    // register로 등록하지 않고, 강제로 값을 넣어주는 기능
    setValue("contents", value === "<p><br></p>" ? "" : value);
    console.log(value);

    // onChange 됐는지 react-hook-form에 알려주는 기능
    trigger("contents");
  }

  return (
    <form onSubmit={handleSubmit(onClickMyButton)}>
      작성자: <input type="text" {...register("writer")} />
      <br />
      비밀번호: <input type="password" {...register("password")} />
      <br />
      제목: <input type="text" {...register("title")} />
      <br />
      내용: <ReactQuill onChange={onChangeMyEditor} />
      <br />
      <button type="submit">등록하기</button>
      {/* <button type="button" onClick={onClickMyButton}>나의버튼</button>
      <button type="reset">등록하기</button> */}
    </form>
  );
}
