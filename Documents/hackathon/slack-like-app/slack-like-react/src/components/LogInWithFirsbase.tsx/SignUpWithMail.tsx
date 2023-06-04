import React, {useState} from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom';





const SignUpWithMail: React.FC =() => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const auth = getAuth();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(email, password);


    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential)=>{
        const user = userCredential.user;
        const uid = user.uid;

        history.push(`/IsThereAccount/${uid}`);
      })
      .catch((error)=>{
        const errorCode = error.code;
        const errorMesssage = error.message;
      })
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }


  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input 
          name="email" 
          type="email" 
          placeholder="email"
          value={email}
          onChange={handleChangeEmail}
           />
        </div>
        <div>
        <label>パスワード</label>
          <input 
          name="password" 
          type="password"
          value={password}
          onChange={handleChangePassword}
           />
        </div>
        <div>
          <button type="submit">登録</button>
        </div>

      </form>
    </div>
  );
};

export default SignUpWithMail;