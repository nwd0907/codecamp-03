import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenapiWithUseEffectPage() {
  const [dog, setDog] = useState("");

  useEffect(() => {
    async function myRestFuc() {
      const result: any = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      setDog(result.data.message);
    }
    myRestFuc();
  }, []);

  return (
    <>
      <h1>오픈API</h1>
      <img src={dog} />
    </>
  );
}
