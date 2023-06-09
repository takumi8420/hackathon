
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginWithGoogleForm from "./Pages/LoginPage/LoginWithGoogleForm";
import Contents  from "./Pages/UserPage/MainPage/ChatPage";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import SignUp from "./Pages/LoginPage/SignUpWithMail"
import SignIn from './Pages/LoginPage/LogInWithMail';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';





function App() {
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

  // let pageContent;

  return (
    <div>
      <div className="App">
        <header className="App-header">
      <h1>
        SLUCK
      </h1>
      <img src={logo} className="App-logo" alt="logo" />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <LoginWithGoogleForm/>


        <Link to="/LogInWithMail">
          <button style={{height: "30px", width: "200px"}}>メールアドレスでログイン</button>
        </Link>

        <Link to="/SignUpWithMail">
          <button style={{height: "30px", width: "200px"}}>メールアドレスで登録する</button>
        </Link>
      </div>
      
      </header>
    </div>
  </div>
    
  );
}


export default App;


