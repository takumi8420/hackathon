import { fireAuth } from "../../firebase";
import { signOut } from "firebase/auth";
import React, {useState} from "react"


const SignOut: React.FC = () => {
  const handleSignOut = () => {
    signOut(fireAuth)
      .then(() => {
        alert("ログアウトしました");
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
