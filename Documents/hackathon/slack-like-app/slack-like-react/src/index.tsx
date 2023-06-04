import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginWithGoogleForm from './components/LogInWithFirsbase.tsx/LoginWithGoogleForm';
import SignUpWithMail from './components/LogInWithFirsbase.tsx/SignUpWithMail';
import LogInWithMail from './components/LogInWithFirsbase.tsx/LogInWithMail';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import IsThereAccount from './components/AccessToDatabase/IsThereAccount';
import RegisterAccount from './components/AccessToDatabase/RegisterAccount';
import Contents from './components/UserPage/Contents';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/Login" component={LogInPage} /> */}
        <Route exact path="/LoginWithGoogle" component={LoginWithGoogleForm} />
        <Route exact path="/SignUpWithMail" component={SignUpWithMail} />
        <Route exact path="/LoginWithMail" component={LogInWithMail} />
        {/* <Route exact path="/UserPage" component={UserPage} /> */}
        <Route path="/IsThereAccount" component={IsThereAccount} />
        <Route path="/RegisterAccount" component={RegisterAccount} />
        <Route path="/UserPage" component={Contents} />

        


        
        
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
