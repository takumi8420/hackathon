import { fireAuth } from "../firebase";
import { signOut } from "firebase/auth";
import React, {useState} from "react"



interface SignOutProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const SignOut: React.FC<SignOutProps> = ({ setCurrentPage }) => {
  const handleSignOut = () => {
    signOut(fireAuth)
      .then(() => {
        alert("ログアウトしました");
        setCurrentPage("defaultPage");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <button onClick={handleSignOut}>ログアウトする</button>
    </div>
  );
};

export default SignOut;
