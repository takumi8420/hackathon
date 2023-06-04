import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

const LogInPage: React.FC = () => {
  return (
    <div>
      <Link to="/googleaccount">
        <button>Googleアカウントでサインイン</button>
      </Link>


      <Link to="/loginwithmail">
        <button>メールアドレスでログイン</button>
      </Link>

      <Link to="/signupmail">
        <button>メールアドレスで登録する</button>
      </Link>

    </div>
  );
};

export default LogInPage;