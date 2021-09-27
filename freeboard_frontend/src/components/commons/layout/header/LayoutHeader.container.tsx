import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";

export default function LayoutHeader() {
  const router = useRouter();

  function onClickLogo() {
    router.push("/boards");

    return "aaa";
  }

  function onClickMoveToLogin() {
    router.push("/login");
  }

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToLogin={onClickMoveToLogin}
    />
  );
}
