import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUpWithMail from './Pages/LoginPage/SignUpWithMail';
import LogInWithMail from './Pages/LoginPage/LogInWithMail';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import IsThereAccount from './Pages/LoginPage/IsThereAccount';
import RegisterAccount from './Pages/LoginPage/RegisterAccount';
import Contents from './Pages/UserPage/MainPage/ChatPage';
import EditUserSetting from './Pages/UserPage/MainPage/UserSettingCompo/UserSettingPage';
import UploadPage from './Pages/UserPage/MainPage/UserSettingCompo/UpLoadPhoto/UploadPage'





ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/SignUpWithMail" component={SignUpWithMail} />
        <Route exact path="/LoginWithMail" component={LogInWithMail} />
        <Route path="/IsThereAccount" component={IsThereAccount} />
        <Route path="/RegisterAccount" component={RegisterAccount} />
        <Route path="/UserPage" component={Contents} />
        <Route path="/EditUserName" component={EditUserSetting} />
        <Route path="/UploadPage" component={UploadPage} />
        
    

        


        
        
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
