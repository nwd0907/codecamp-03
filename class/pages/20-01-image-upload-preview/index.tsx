import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { fileValidation } from "../../src/commons/libraries/validation";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function ImageUploadPreviewPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [myFile, setMyFile] = useState();
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const fileRef = useRef<HTMLInputElement>();

  function onClickGray() {
    fileRef.current.click();
  }

  function onChangeFile(event) {
    const file = event.target.files[0];
    if (!fileValidation(file)) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      console.log(data.target.result);
      setImageUrl(data.target.result);
      setMyFile(file);
    };
  }

  async function onClickSubmit() {
    const start = performance.now();
    const result = await Promise.all([
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
      uploadFile({ variables: { file: myFile } }),
    ]);

    // [result1, result2, result3, ...]
    // result.map((el) => (el.data.uploadFile.url)) // [url1, url2, url3, ...]
    const urls = result.map((el) => el.data.uploadFile.url);

    const end = performance.now();
    console.log(end - start);
    // const start = performance.now();
    // const result1 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result2 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result3 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result4 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result5 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result6 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result7 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const result8 = await uploadFile({
    //   variables: {
    //     file: myFile,
    //   },
    // });
    // const end = performance.now();
    // console.log(end - start);
    // const url = result.data.uploadFile.url;
    // 게시물등록
    // createBoard({ variables: {
    //  ...
    //  images: urls
    // } })
  }

  return (
    <>
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "gray" }}
        onClick={onClickGray}
      >
        이미지 업로드!!
      </div>
      <img src={imageUrl} style={{ width: "200px", height: "200px" }} />
      <input type="file" ref={fileRef} onChange={onChangeFile} />
      <button onClick={onClickSubmit}>게시물 등록하기</button>
    </>
  );
}
