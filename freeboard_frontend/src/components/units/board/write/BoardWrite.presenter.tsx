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
  Wrapper,
  Writer,
  WriterWrapper,
  Youtube,
  Zipcode,
  ZipcodeWrapper,
  UploadButton,
} from "./BoardWrite.styles";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function BoardWriteUI(props) {
  return (
    <>
      {props.isOpen && (
        <Modal visible={true}>
          <DaumPostcode onComplete={props.onCompleteAddressSearch} autoClose />
        </Modal>
      )}
      <Wrapper>
        <Title>{props.isEdit ? "게시판 수정" : "게시판 등록"}</Title>
        <WriterWrapper>
          <InputWrapper>
            <Label>작성자</Label>
            <Writer
              name="writer"
              type="text"
              placeholder="이름을 적어주세요."
              onChange={props.onChangeWriter}
              readOnly={Boolean(props.data?.fetchBoard.writer)}
              defaultValue={props.data?.fetchBoard.writer}
            />
            <Error>{props.writerError}</Error>
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Password
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={props.onChangePassword}
            />
            <Error>{props.passwordError}</Error>
          </InputWrapper>
        </WriterWrapper>
        <InputWrapper>
          <Label>제목</Label>
          <Subject
            name="title"
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={props.onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
          <Error>{props.titleError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>내용</Label>
          <Contents
            name="contents"
            placeholder="내용을 작성해주세요."
            onChange={props.onChangeContents}
            defaultValue={props.data?.fetchBoard.contents}
          />
          <Error>{props.contentsError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>주소</Label>
          <ZipcodeWrapper>
            <Zipcode
              name="zipcode"
              placeholder="07250"
              readOnly
              value={
                props.zipcode || props.data?.fetchBoard.boardAddress?.zipcode
              }
            />
            <SearchButton onClick={props.onClickAddressSearch}>
              우편번호 검색
            </SearchButton>
          </ZipcodeWrapper>
          <Address
            readOnly
            value={
              props.address || props.data?.fetchBoard.boardAddress?.address
            }
          />
          <Address
            onChange={props.onChangeAddressDetail}
            defaultValue={props.data?.fetchBoard.boardAddress?.addressDetail}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>유튜브</Label>
          <Youtube
            name="youtube"
            placeholder="링크를 복사해주세요."
            onChange={props.onChangeYoutubeUrl}
            defaultValue={props.data?.fetchBoard.youtubeUrl}
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
          {!props.isEdit && (
            <SubmitButton
              onClick={props.onClickSubmit}
              isActive={props.isActive}
              disabled={!props.isActive}
            >
              등록하기
            </SubmitButton>
          )}
          {props.isEdit && (
            <SubmitButton onClick={props.onClickUpdate} isActive={true}>
              수정하기
            </SubmitButton>
          )}
        </ButtonWrapper>
      </Wrapper>
    </>
  );
}
