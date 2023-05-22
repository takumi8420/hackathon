
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginWithGoogleForm from "./LoginWithGoogleForm";
import Contents  from "./Contents";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import SignUp from "./components/SignUp"
import DefaultPage from "./DefaultPage"
import SignIn from './components/SignIn';
import logo from './logo.svg';





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

  const [currentPage, setCurrentPage] = useState("defaultPage");

  let pageContent;

  switch (currentPage) {
    case "SignUp":
      pageContent = <SignUp setCurrentPage={setCurrentPage} />;
      break;

    case "LoginWithGoogleForm":
      pageContent = <LoginWithGoogleForm setCurrentPage={setCurrentPage}/>;
      break;

    case "SignIn":
      pageContent = <SignIn setCurrentPage={setCurrentPage}/>;
    break;

    case "Contents":
      pageContent = <Contents setCurrentPage={setCurrentPage}/>;
      break;

    default:
      pageContent = <DefaultPage setCurrentPage={setCurrentPage}/>;
      break;
  }





  return (
    <div>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
      <div>
        
        {currentPage === "defaultPage" && pageContent}
        {currentPage === "SignUp" && pageContent}
        {currentPage === "SignIn" && pageContent}
        {currentPage === "LoginWithGoogleForm" && pageContent}
      </div>
      <div>
        {currentPage === "Contents" && pageContent}
        {/* {loginUser ? <Contents /> : null} */}
      </div>
    </div>
    
  );
}


export default App;


