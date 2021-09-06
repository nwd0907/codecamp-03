import { useState } from 'react';
import {
  Error,
  Address,
  ButtonWrapper,
  Contents,
  ImageWrapper,
  InputWrapper,
  Label,
  OptionWrapper,
  Password,
  RadioButton,
  RadioLabel,
  SearchButton,
  Subject,
  SubmitButton,
  Title,
  UploadButton,
  Wrapper,
  Writer,
  WriterWrapper,
  Youtube,
  Zipcode,
  ZipcodeWrapper,
} from '../../../styles/BoardsNew.styles';
import {useMutation, gql} from '@apollo/client'
import {useRouter} from 'next/router'
  
export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;
  
  export default function BoardNewPage() {
    const router = useRouter()

    const [writer, setWriter] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')

    const [writerError, setWriterError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [titleError, setTitleError] = useState('')
    const [contentsError, setContentsError] = useState('')

    const [createBoard] = useMutation(CREATE_BOARD);

    function onChangeWriter(event){
      setWriter(event.target.value)
      if(event.target.value !== ""){
        setWriterError("")
      }
    }

    function onChangePassword(event){
      setPassword(event.target.value)
      if(event.target.value !== ""){
        setPasswordError("")
      }
    }

    function onChangeTitle(event){
      setTitle(event.target.value)
      if(event.target.value !== ""){
        setTitleError("")
      }
    }

    function onChangeContents(event){
      setContents(event.target.value)
      if(event.target.value !== ""){
        setContentsError("")
      }
    }

    async function onClickSubmit(){
      if(writer === ""){
        setWriterError("작성자를 입력해주세요.")
      }
      if(password === ""){
        setPasswordError("비밀번호를 입력해주세요.")
      }
      if(title === ""){
        setTitleError("제목을 입력해주세요.")
      }
      if(contents === ""){
        setContentsError("내용을 입력해주세요.")
      }
      if(writer !== "" && password !== "" && title !== "" && contents !== ""){
        try {
          const result = await createBoard({
            variables: {
              createBoardInput: {
                writer: writer,
                password: password,
                title: title,
                contents: contents,
              },
            },
          });
          // console.log(result.data.createBoard._id)
          router.push(`/boards/${result.data.createBoard._id}`)
        } catch(error){
          console.log(error)
        }
      }
    }

    return (
      <Wrapper>
        <Title>게시판 등록</Title>
        <WriterWrapper>
          <InputWrapper>
            <Label>작성자</Label>
            <Writer
              name="writer"
              type="text"
              placeholder="이름을 적어주세요."
              onChange={onChangeWriter}
            />
            <Error>{writerError}</Error>
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Password
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={onChangePassword}
            />
            <Error>{passwordError}</Error>
          </InputWrapper>
        </WriterWrapper>
        <InputWrapper>
          <Label>제목</Label>
          <Subject
            name="title"
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={onChangeTitle}
          />
          <Error>{titleError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>내용</Label>
          <Contents
            name="contents"
            placeholder="내용을 작성해주세요."
            onChange={onChangeContents}
          />
          <Error>{contentsError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>주소</Label>
          <ZipcodeWrapper>
            <Zipcode
              name="zipcode"
              placeholder="07250"
            />
            <SearchButton>우편번호 검색</SearchButton>
          </ZipcodeWrapper>
          <Address />
          <Address />
        </InputWrapper>
        <InputWrapper>
          <Label>유튜브</Label>
          <Youtube
            name="youtube"
            placeholder="링크를 복사해주세요."
          />
        </InputWrapper>
        <ImageWrapper>
          <Label>사진첨부</Label>
          <UploadButton>
            {/* <input
              type="file"
              style={{ display: "none" }}
              ref={fileRef}
            /> */}
            <div>+</div>
            <div>Upload</div>
          </UploadButton>
          <UploadButton>
            <div>+</div>
            <div>Upload</div>
          </UploadButton>
          <UploadButton>
            <div>+</div>
            <div>Upload</div>
          </UploadButton>
        </ImageWrapper>
        <OptionWrapper>
          <Label>메인설정</Label>
          <RadioButton type="radio" id="youtube" name="radio-button" />
          <RadioLabel htmlFor="youtube">유튜브</RadioLabel>
          <RadioButton type="radio" id="image" name="radio-button" />
          <RadioLabel htmlFor="image">사진</RadioLabel>
        </OptionWrapper>
        <ButtonWrapper>
          <SubmitButton onClick={onClickSubmit}>
            등록하기
          </SubmitButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }
  