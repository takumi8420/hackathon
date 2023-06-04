
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginWithGoogleForm from "./LogInWithFirsbase.tsx/LoginWithGoogleForm";
import Contents  from "./UserPage/Contents";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../firebase";
import SignUp from "./LogInWithFirsbase.tsx/SignUpWithMail"
import SignIn from './LogInWithFirsbase.tsx/LogInWithMail';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';



const DefaultPage: React.FC = () => {

  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);

  // ログイン状態を監視して、stateをリアルタイムで更新する
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
      setLoginUser(user);
    });

    // 最初にログイン状態をuserに入れる。
    return () => {
      unsubscribe();
    };
  }, []);

  // const [currentPage, setCurrentPage] = useState("defaultPage");

  let pageContent;





  return (
    <div>
      <div className="App">
      <header className="App-header">
      <h1>
        SLACK-LIKE-APP
      </h1>
        <img src={logo} className="App-logo" alt="logo" />

      <div>
        <Link to="/LoginWithGoogle">
          <button>Googleアカウントでサインイン</button>
        </Link>


        <Link to="/LogInWithMail">
          <button>メールアドレスでログイン</button>
        </Link>

        <Link to="/SignUpWithMail">
          <button>メールアドレスで登録する</button>
        </Link>
      </div>
      
      </header>
    </div>
  </div>
    
  );
}


  export default DefaultPage;


