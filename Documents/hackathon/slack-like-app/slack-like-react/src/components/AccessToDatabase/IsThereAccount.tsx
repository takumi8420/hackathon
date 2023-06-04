import { strict } from "assert";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

interface User {
  user_id: string;
  name: string;
  age: number;
  // 他のユーザープロパティを追加する場合はここに追記
}

const IsThereAccount: React.FC = () => {
  const [userData, setUserData] = useState<User>();
  const history = useHistory();


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
            setUserData(data);
            // 取得したデータを使って処理を行う
            if (data && Object.keys(data).length > 0) {
              history.push(`/UserPage/${data.user_id}`);
              console.log("data:",data.user_id);
          } else {
            history.push(`/RegisterAccount/${uid}`);
              // console.log(data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
          <p>UID: {userData?.user_id}</p>
    </div>


  );
};

export default IsThereAccount;
