import React from "react";

interface DefaultPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const DefaultPage: React.FC<DefaultPageProps> = ({ setCurrentPage }) => {

  const handlePageChangeToMailForm = () => {
    setCurrentPage("SignUp");
  };
  const handlePageChangeToGoogleForm = () => {
    setCurrentPage("LoginWithGoogleForm");
  };
  const handlePageChangeToSignInWithMailForm = () => {
    setCurrentPage("SignIn");
  };


  return (
    <div>
      <button onClick={handlePageChangeToMailForm}>
        メールアドレスでサインアップ
      </button>

      <button onClick={handlePageChangeToGoogleForm}>
        Googleアカウントでサインイン
      </button>

      <button onClick={handlePageChangeToSignInWithMailForm}>
        メールアドレスでログイン
      </button>
    </div>
  );
};

export default DefaultPage;
