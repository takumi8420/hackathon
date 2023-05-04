import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import React, {useState} from "react"

interface SignUpProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginWithGoogleForm: React.FC<SignUpProps> = ({setCurrentPage}) => {
  /**
   * googleでログインする
   */
  const signInWithGoogle = ():void => {
    // Google認証プロバイダを利用する
    const provider = new GoogleAuthProvider();

    // ログイン用のポップアップを表示
    signInWithPopup(fireAuth, provider)
      .then(res => {
        const user = res.user;
        alert("ログインユーザー: " + user.displayName);
        setCurrentPage("Contents");
      })
      .catch(err => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>
        Googleでログイン
      </button>
      {/* <button onClick={signOutWithGoogle}>
        ログアウト
      </button> */}
    </div>
  );
};

export default LoginWithGoogleForm