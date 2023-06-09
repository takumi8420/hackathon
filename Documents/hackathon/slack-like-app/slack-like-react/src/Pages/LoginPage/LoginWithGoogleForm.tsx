import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { fireAuth } from "../../firebase";
import React, {useState} from "react"
import { useHistory } from 'react-router-dom';




const LoginWithGoogleForm: React.FC = () => {
  const history = useHistory();
  const fireAuth = getAuth();
  
  const signInWithGoogle = (): void => {
    // Google認証プロバイダを利用する
    const provider = new GoogleAuthProvider();


    // ログイン用のポップアップを表示
    signInWithPopup(fireAuth, provider)
      .then(res => {
        const user = res.user;
        const displayName = user.displayName;
        const uid = user.uid;

        alert("ログインユーザー: " + displayName);

        // ログイン成功後、リダイレクトする
        history.push(`/IsThereAccount/${uid}`);
      })
      .catch(err => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <button style={{height: "30px", width: "200px"}} onClick={signInWithGoogle}>
        Googleでログイン
      </button>
    </div>
  );
};

export default LoginWithGoogleForm;