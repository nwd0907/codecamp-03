import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "./BoardWrite.queries";
import { IMyUpdateBoardInput } from "./BoardWrite.types";

export default function BoardWrite(props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // const [fileUrls, setFileUrls] = useState(["고양이이미지.png", "", "강아지이미지.png"]); // 이미지 1차 실습
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]); // 이미지 2차 실습

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  function onChangeWriter(event) {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }

    if (
      event.target.value !== "" &&
      password !== "" &&
      title !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }

    if (
      writer !== "" &&
      event.target.value !== "" &&
      title !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }

    if (
      writer !== "" &&
      password !== "" &&
      event.target.value !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  function onChangeContents(event) {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }

    if (
      writer !== "" &&
      password !== "" &&
      title !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  function onChangeYoutubeUrl(event) {
    setYoutubeUrl(event.target.value);
  }

  function onChangeAddressDetail(event) {
    setAddressDetail(event.target.value);
  }

  function onClickAddressSearch() {
    setIsOpen(true);
  }

  function onCompleteAddressSearch(data: any) {
    setAddress(data.address);
    setZipcode(data.zonecode);
    setIsOpen(false);
  }

  async function onClickSubmit() {
    if (writer === "") {
      setWriterError("작성자를 입력해주세요.");
    }
    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (title === "") {
      setTitleError("제목을 입력해주세요.");
    }
    if (contents === "") {
      setContentsError("내용을 입력해주세요.");
    }
    if (writer !== "" && password !== "" && title !== "" && contents !== "") {
      try {
        ////////////////////////////////////////// 이미지 2차 실습 ///////////////////////////////////
        const uploadFiles = files // [File1, File2, ""]
          .filter((el) => el) // [File1, File2]
          .map((el) => uploadFile({ variables: { file: el } })); // [ uploadFile({ variables: { file: File1 } }), uploadFile({ variables: { file: File2 } }) ]
        const results = await Promise.all(uploadFiles); // await Promise.all([ uploadFile({ variables: { file: File1 } }), uploadFile({ variables: { file: File2 } }) ])
        const myImages = results.map((el) => el.data.uploadFile.url); // ["강아지이미지.png", "고양이이미지.png"]
        ///////////////////////////////////////////////////////////////////////////////////////////

        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: zipcode,
                address: address,
                addressDetail: addressDetail,
              },
              // images: [...fileUrls], // 이미지 1차 실습
              images: myImages, // 이미지 2차 실습
            },
          },
        });
        // console.log(result.data.createBoard._id)
        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function onClickUpdate() {
    if (
      !title &&
      false &&
      !youtubeUrl &&
      !zipcode &&
      !address &&
      !addressDetail
    ) {
      alert("수정된 내용이 없습니다.");
      return;
    }
    const myUpdateboardInput: IMyUpdateBoardInput = {};
    if (title) myUpdateboardInput.title = title;
    if (contents) myUpdateboardInput.contents = contents;
    if (youtubeUrl) myUpdateboardInput.youtubeUrl = youtubeUrl;
    if (zipcode || address || addressDetail) {
      myUpdateboardInput.boardAddress = {};
      if (zipcode) myUpdateboardInput.boardAddress.zipcode = zipcode;
      if (address) myUpdateboardInput.boardAddress.address = address;
      if (addressDetail)
        myUpdateboardInput.boardAddress.addressDetail = addressDetail;
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password: password,
          updateBoardInput: myUpdateboardInput,
        },
      });
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (err) {
      // console.log(err.message)
      alert(err.message);
    }
  }

  //////////////////// 이미지 1차 실습 /////////////////////////////////
  // function onChangeFileUrls(fileUrl: string, index: number) {
  //   const newFileUrls = [...fileUrls];    // ["고양이이미지.png", "", ""]
  //   newFileUrls[index] = fileUrl          // ["고양이이미지.png", "", "강아지이미지.png"]
  //   setFileUrls(newFileUrls);
  // }
  ///////////////////////////////////////////////////////////////////

  //////////////////// 이미지 2차 실습 /////////////////////////////////
  function onChangeFiles(file: File, index: number) {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  }
  ///////////////////////////////////////////////////////////////////

  return (
    <BoardWriteUI
      isActive={isActive}
      isOpen={isOpen}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onChangeYoutubeUrl={onChangeYoutubeUrl}
      onChangeAddressDetail={onChangeAddressDetail}
      onClickAddressSearch={onClickAddressSearch}
      onCompleteAddressSearch={onCompleteAddressSearch}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      writerError={writerError}
      passwordError={passwordError}
      titleError={titleError}
      contentsError={contentsError}
      isEdit={props.isEdit}
      data={props.data}
      address={address}
      zipcode={zipcode}
      //////////////////// 이미지 1차 실습 /////////////////////
      // fileUrls={fileUrls}
      // onChangeFileUrls={onChangeFileUrls}
      //////////////////////////////////////////////////////

      //////////////////// 이미지 2차 실습 ////////////////////
      onChangeFiles={onChangeFiles}
      /////////////////////////////////////////////////////
    />
  );
}
