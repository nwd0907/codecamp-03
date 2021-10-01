import { createContext } from "react";
import MyBoardWrite from "../../src/components/units/22-context-api/MyBoardWrite.container";

export const MyContext = createContext(null);
export default function ContextAPIPage() {
  const value = {
    isEdit: true,
  };

  return (
    <MyContext.Provider value={value}>
      <MyBoardWrite />
    </MyContext.Provider>
  );
}
