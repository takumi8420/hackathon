import React from "react";
import  SignOut from "./components/SignOut"


interface ContenntProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}
const Contents: React.FC<ContenntProps> = ({ setCurrentPage }) => {
  return (
    <div>
      <h2>ようこそ！ログインしました。</h2>
      <p>ここには、ログインユーザーが見ることができるコンテンツが表示されます。</p>
      <SignOut setCurrentPage={setCurrentPage} />
    </div>

  );
};

export default Contents;
