import { useRouter } from "next/router";
import { MouseEvent } from "react";
import LayoutNavigationUI from "./LayoutNavigation.presenter";

export default function LayoutNavigation() {
  const router = useRouter();

  function onClickMenu(event) {
    router.push(event.target.id);
  }

  return <LayoutNavigationUI onClickMenu={onClickMenu} />;
}
