import useAuth from "../../src/components/commons/hooks/useAuth";

export default function CustomHooksPage() {
  return useAuth() || <div>CustomHooks 연습 페이지 입니다!</div>;
}
