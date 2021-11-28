import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../pages/_app";

export default function useAuth() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 한 사람만 입장 가능합니다.");
      router.push("/23-01-login");
    } else {
      setLoaded(true);
    }
  }, []);

  if (loaded) return false;
  return <></>;
}
