import React from "react";
import './Contents.css';
import { useState, useEffect } from "react";




const Contents: React.FC = () => {
  const [messageDatas, setMessageDatas] = useState<messageData[]>([]);
  const [channelData, setChannelData] = useState<channelData[]>([]);
  const [workspaceData, setWorkspaceData] = useState<workspaceData[]>([]);
  const url = window.location.href;
  const uid = url.substring(url.lastIndexOf("/") + 1);
  // console.log(uid);


  type messageData ={
    user_name: string;
    message_id: string;
    channel_id: string; 
    user_id:    string;   
    contents:  string;    
    created_at: Date;
  }

  type workspaceData ={
    workspace_user_name: string;
    workspace_id: string;
    workspace_name: string; 
  }

  type channelData ={
    channelName: string; 
  }


  const fetchMessageData = async () => {
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_messages_with_channel_id/01H176RMW0FKAPB8R6509H9BJX`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("ここまでおk");
    const data = await getResponse.json();
    console.log("get response is...", data);
    setMessageDatas(data);
    // console.log(messageDatas[0].contents)
    

  };

  

  const fetchWorkspaceData = async () => {
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_workspace_with_user_id/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getResponse.json();
    console.log("get workspace response is...", data);
    setWorkspaceData(data);
  };

  const fetchChannelData = async () => {
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_channel_with_workspace_id/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getResponse.json();
    console.log("get channel response is...", data);
    setChannelData(data);
  };

  useEffect(() => {
    fetchWorkspaceData();
    // fetchChannelData();
    fetchMessageData();
  }, []);



  

  return (
      <div className="slack-page">

        <div className="top-bar">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="table">
              {workspaceData.map((data: workspaceData) => (
                <div key={data.workspace_id} className="workspace-contents">
                  <p className="element">{data.workspace_name} </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="body-contents">
          
          <div className="sidebar1">
            {/* サイドバーのコンテンツ */}
            <p>aaa</p>
          </div>

          <div className="main-content">
            <header className="header">
              <p>現在のチャンネル</p>
                {/* ヘッダーのコンテンツ */}
            </header>
            <div className="chat-area">
              {/* チャットエリアのコンテンツ */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="table">
                  {messageDatas.map((data: messageData) => (
                    <div key={data.message_id} className="chat-contents">
                      <p className="element">Name: {data.user_name} <br /> {data.contents}</p>
                    </div>
                  ))}
                </div>
              </div>   
            </div>
            <div className="user-list">
              <p>入力欄</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Contents;
