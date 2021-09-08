import {
  Avatar,
  AvatarWrapper,
  Body,
  Button,
  Contents,
  CreatedAt,
  BottomWrapper,
  Header,
  Info,
  Title,
  Wrapper,
  Writer,
  CardWrapper,
} from "./BoardDetail.styles";

export default function BoardDetailUI(props) {
  return (
    <Wrapper>
      <CardWrapper>
        <Header>
          <AvatarWrapper>
            <Avatar src="/images/avatar.png" />
            <Info>
              <Writer>{props.data?.fetchBoard.writer}</Writer>
              <CreatedAt>{props.data?.fetchBoard.createdAt}</CreatedAt>
            </Info>
          </AvatarWrapper>
        </Header>
        <Body>
          <Title>{props.data?.fetchBoard.title}</Title>
          <Contents>{props.data?.fetchBoard.contents}</Contents>
        </Body>
      </CardWrapper>
      <BottomWrapper>
        <Button onClick={props.onClickMoveToList}>목록으로</Button>
        <Button onClick={props.onClickMoveToEdit}>수정하기</Button>
        <Button onClick={props.onClickDelete}>삭제하기</Button>
      </BottomWrapper>
    </Wrapper>
  );
}
