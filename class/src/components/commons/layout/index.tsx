import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactChild } from "react";
import LayoutFooter from "./footer/LayoutFooter.container";
import LayoutHeader from "./header/LayoutHeader.container";

const Wrapper = styled.div``;

const Body = styled.div``;

const SidebarWrapper = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  background-color: yellow;
  width: 300px;
`;

const HIDDEN_FOOTER = ["/13-01-layout-hidden"];

interface IProps {
  children: ReactChild;
}
export default function Layout(props: IProps) {
  const router = useRouter();
  const isHiddenFooter = HIDDEN_FOOTER.includes(router.pathname);

  return (
    <Wrapper>
      {/* <Header>여기는 헤더 영역입니다.</Header> */}
      <LayoutHeader />
      <SidebarWrapper>
        <Sidebar>여기는 사이드바 영역입니다.</Sidebar>
        <Body>{props.children}</Body>
      </SidebarWrapper>
      {!isHiddenFooter && <LayoutFooter />}
      {/* <Footer>여기는 푸터 영역입니다.</Footer> */}
    </Wrapper>
  );
}
