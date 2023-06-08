import { useState } from "react";
import RegisterForm from "./RegisterForm"
import { useHistory } from 'react-router-dom';


type User = {
  age: number;
  user_id: string;
  user_name: string;
  // 他のユーザープロパティを追加する場合はここに追記
}


function RegisterAccount(){
  const [userData, setUserData] = useState<User>();
  const history = useHistory();
  const url = window.location.href;
  const uid = url.substring(url.lastIndexOf("/") + 1);


  const fetchData = async () => {
    try {
      // URLからuidを取得
      const url = window.location.href;
      const uid = url.substring(url.lastIndexOf("/") + 1);
      console.log(uid);
    
      // uidが存在する場合のみGETリクエストを送る
      if (uid) {
        const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/search_user/${uid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Methods": "GET",
            "Access-Control-Request-Headers": "Content-Type"
          },
        });

        if (getResponse.ok) {
          // // 取得したデータを使って処理を行う
            const data: User = await getResponse.json();
            // const filteredData = [data].filter((user) => user.user_id === uid);
            console.log(data)
            setUserData(data);
            console.log("data is:", data.user_id);
            // 取得したデータを使って処理を行う
            if (data && Object.keys(data).length > 0) {
              history.push(`/UserPage/${data.user_id}`);
          } else {
            history.push(`/RegisterAccount/${uid}`);
              console.log(data);
          }
            
        }
         else {
          console.error("Failed to fetch data:", getResponse.statusText);
        }
      } else {
        console.error("No uid found in the URL");
      }
    } catch (error) {
      console.error("can not catch :", error);
    }
  };





  const onSubmit = async (name: string, age: number) => {
    try {
      const result = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/register_user/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Methods": "POST",
          "Access-Control-Request-Headers": "Content-Type"
          },
        body: JSON.stringify({
          name: name,
          age: age
        }),
      });
      if (!result.ok) {
        throw Error(`Failed to create user: ${result.status}`);
      }else{
        fetchData();
      };

    } catch (err) {
      console.error(err);
    };
  };

  return (
    <div style={{ display: "flex", flexDirection:  "column"}}>
      <div className="App">
        {/* <header className="App-header" style={{ height: "auto" }}>
          <div>
            <h1>User Register</h1>
          </div>
        </header> */}
        <div className="main">
          <h1>登録してね</h1>
          <RegisterForm 
            onSubmit={onSubmit} 
          />
        </div>
        
      </div>
      </div>
  );
};



export default RegisterAccount;