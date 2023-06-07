import React, { Attributes } from "react";
import './Contents.css';
import { useState, useEffect, useRef } from "react";
import Form from "./Form";
import { Button} from "@mui/material";
import { Height, MarginOutlined, Send as SendIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import Modal from 'react-modal'
import { TextField } from '@mui/material';
import { Icon } from '@mui/material';
import { IconButton } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';
import Setting from "./compo/setting";
import BasicButtons from "./compo/addChannelIcon";
import ToggleButtonsMultiple from "./compo/inputFormOption"





const Contents: React.FC = () => {
  // const location = useLocation();
  // const thisWorkspace = location.state && location.state.currentWorkspace;

  const [messageDatas, setMessageDatas] = useState<messageData[]>([]);

// チャンネルのusestate
  const [channelData, setChannelData] = useState<channelData[]>([]);
  const [currentChannelData, setCurrentChannelData] = useState<channelData>();

// workspaceのusestate
  const [workspaceData, setWorkspaceData] = useState<workspaceData[]>([]);
  const [currentWorkspaceData, setCurrentWorkspaceData] = useState<workspaceData>();

  const [selectedMessageId, setSelectedMessageId] = useState("");
  const [selectedWorkspaceId, setselectedWorkspaceId] = useState("");

// urlの取得
  const url = window.location.href;
  const uid = url.substring(url.lastIndexOf("/") + 1);


  // const [isEditing, setIsEditing] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalToCreateChannel, setShowModalToCreateChannel] = useState(false);




  // modalの使用
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalToCreateChannel = () => {
    setShowModalToCreateChannel(false);
  };

  const openModalToCreateChannel = () => {
    setShowModalToCreateChannel(true);
  };

  const [inputEditValue, setInputEditValue] = useState("");
  const [inputChannelName, setInputChannelName] = useState("");
  const [inputWorkspaceName, setInputWorkspaceName] = useState("");


  type messageData ={
    user_name: string;
    message_id: string;
    channel_id: string; 
    user_id:    string;   // user_id が同じ人に限り編集が可能になるようにしたい。（バックエンドでそのことを航路したくない。）
    contents:  string;    
    created_at: string;
    is_edited: number;
    // isMenuOpen: boolean;
  }

  type workspaceData ={
    workspace_user_name: string;
    workspace_id: string;
    workspace_name: string; 
  }

  type channelData ={
    channel_id: string;
    channel_name: string; 
  }


    // メッセージの削除
  const onDeleteMessage = async (messageId: string) => {
    try{
      const result = await fetch("https://hackthon1-rzmhhbabrq-uc.a.run.app/delete_messages/${uid}",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message_id: messageId,
        }),
      });
        if (!result.ok) {
          throw Error(`Failed to create user: ${result.status}`);
        }
      } catch (err) {
        console.error(err);
      }

    fetchMessageData();
    }

    // メッセージの送信
  const onSendMessage = async (channelId: string, userId: string, message: string) => {
    try{
      const result = await fetch("https://hackthon1-rzmhhbabrq-uc.a.run.app/send_messages/${uid}",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel_id: channelId,
          user_id: userId, 
          contents: message,
        }),
      });
        if (!result.ok) {
          throw Error(`Failed to create user: ${result.status}`);
        }
      } catch (err) {
        console.error(err);
      }
      fetchMessageData();
    }

    const onRegisterChannel = async (channelName:string, workspaceId: string) => {
      try{
        const result = await fetch("https://hackthon1-rzmhhbabrq-uc.a.run.app//register_channel/${uid}",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel_name: channelName,
            workspace_id: workspaceId,
          }),
        });
          if (!result.ok) {
            throw Error(`Failed to create channel: ${result.status}`);
          }
        } catch (err) {
          console.error(err);
        }
      }

    // 編集の送信
    const onEditMessage = async (messageId: string, content: string) => {
      try{
        const result = await fetch("https://hackthon1-rzmhhbabrq-uc.a.run.app/edit_messages/${uid}",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message_id: messageId,
            contents: content,
          }),
        });
        console.log("contentは", content)
          if (!result.ok) {
            throw Error(`Failed to create user: ${result.status}`);
          }
        } catch (err) {
          console.error(err);
        }
        fetchMessageData();
      }


// チャンネルの取得
  const initialFetchChannelData = async () => {
    console.log("currentworkspaceは:", currentWorkspaceData?.workspace_id);
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_channel_with_workspace_id/${currentWorkspaceData?.workspace_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getResponse.json();
    console.log("get channel response is...", data);
    setChannelData(data);
    setCurrentChannelData(data[0]);
    // console.log(currentChannelData);
  };





  // workspaceの取得
  const initialFetchWorkspaceData = async () => {
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_workspace_with_user_id/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getResponse.json();
    console.log("get workspace response is...", data);
    setWorkspaceData(data);
    setCurrentWorkspaceData(data[0]);
    console.log(currentWorkspaceData);
  };



  useEffect(() => {
    initialFetchChannelData();
    console.log("get workspace response is...", currentWorkspaceData?.workspace_id);
  }, [currentWorkspaceData])

  useEffect(() => {
    initialfetchMessageData();
    console.log("get workspace response is...", currentWorkspaceData?.workspace_id);
  }, [currentChannelData])

  useEffect(() => {
    
   initialFetchWorkspaceData();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(fetchMessageData, 10000);

  //   return () => clearInterval(intervalId);
  // }, [messageDatas]);

  const fetchChannelData = async (workspaceId: string) => {
    console.log("currentworkspaceは:", currentWorkspaceData?.workspace_id);
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_channel_with_workspace_id/${workspaceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getResponse.json();
    console.log("get channel response is...", data);
    setChannelData(data);
    setCurrentChannelData(data[0]);
  };

  const fetchMessageData = async () => {
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_messages_with_channel_id/${currentChannelData?.channel_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("ここまでおk");
    const data = await getResponse.json();
    console.log("get response is...", data);

    if (JSON.stringify(data) !== JSON.stringify(messageDatas)) {
      console.log("usestate");
      setMessageDatas(data);
    }
    // console.log(messageDatas[0].contents)
    scrollerInner?.scrollIntoView(false);
  };

  const initialfetchMessageData = async () => {
    const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_messages_with_channel_id/${currentChannelData?.channel_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("ここまでおk");
    const data = await getResponse.json();
    console.log("get response is...", data);
    setMessageDatas(data);
    scrollerInner?.scrollIntoView(false);
  }

  const changeWorksapce = async (data: workspaceData) => {
    setCurrentWorkspaceData(data);
    const getResponse1 = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_channel_with_workspace_id/${data.workspace_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const channelData: channelData[] = await getResponse1.json();
    console.log("get channel response is...", channelData);
    setCurrentChannelData(channelData[0]);
    setChannelData(channelData);
    console.log("currentchannelは", channelData[0].channel_id);


    const getResponse2 = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/get_messages_with_channel_id/${channelData[0].channel_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("ここまでおk");
    const messageData = await getResponse2.json();
    console.log("get response is...", messageData);
    setMessageDatas(messageData);
  }



  // const chatAreaRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (chatAreaRef.current) {
  //     chatAreaRef.current.scrollTo(0, chatAreaRef.current.scrollHeight);
  //   }
  // }, [messageDatas]);

  const scrollerInner = document.getElementById("scroller_inner");

  // scrollerInner?.scrollIntoView(false);


  return (
      <div className="slack-page">

        <div className="top-bar" style={{ position: "fixed" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="workspace_table" style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'0px', height:'100%',marginRight: '20px'}}>
                <p style={{marginTop:'10px',  color:'white', fontSize:'24px'}}>ワークスペース</p>
              </div>
          
              {workspaceData.map((data: workspaceData) => (
                <div key={data.workspace_id} className="workspace-contents">
                      <Button 
                      variant="contained" 
                      className="workspace_element" 
                      style={{ fontSize: '8px', marginTop:'10px' ,marginLeft:'10px'}} 
                      onClick={() => {
                      changeWorksapce(data);
                }}>
                    {data.workspace_name}
                  </Button>
                </div>
              ))}


             <div className="MenuIcon">
              <Setting />
            </div>



            </div>
          </div>
        </div>

        <div className="body-contents">
          <div className="sidebar" style={{ position: "fixed" }}>
            {/* サイドバーのコンテンツ */}
            <div style={{ display: "flex", flexDirection: "column" }}></div>
            <div className="channelHeader">チャンネル</div>
            {channelData.map((data: channelData) => (
                <div key={data.channel_id} className="channel-contents">
                  <Button variant="contained" className="channel_element" style={{ fontSize: '8px', margin:'5px' }} onClick={() => {
                      setCurrentChannelData(data);
                      fetchMessageData();
                  }}>
                    {data.channel_name}
                  </Button>
                </div>
              ))}
              
    
             <Button 
             variant="contained" 
             className="circle_div" 
             style={{ fontSize: '8px', marginLeft: '5px', position: 'absolute', bottom: '30px', backgroundColor: 'gray'}} 
             onClick={()=>{
                if(currentWorkspaceData != undefined){
                  setselectedWorkspaceId(currentWorkspaceData.workspace_id)};
                  openModalToCreateChannel();
             }}>
                  Add Channel
                  </Button>
            

            <Modal
                                contentLabel="Example Modal"
                                isOpen={showModalToCreateChannel}
                                style={{
                                  overlay: {
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0)' // モーダルの背景色や透明度を指定する場合はここで設定
                                  },
                                  content: {
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '300px', // モーダルの幅を指定
                                    padding: '20px', // モーダルの内側の余白を指定
                                    backgroundColor: 'darkblue', // モーダルの背景色を指定
                                    borderRadius: '4px', // モーダルの角の丸みを指定
                                    borderColor: 'white'
                                  }
                                }}>                               
                                <button onClick={closeModalToCreateChannel}>close</button>             
                                <form>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{
                                  backgroundColor: 'lightblue',
                                }} 
                                value = {inputChannelName} 
                                onChange={(e) => {
                                  setInputChannelName(e.target.value)
                                }}
                                />
                                <Button type={"submit"} variant="contained" endIcon={<SendIcon />} onClick={() => {
                                  onRegisterChannel(inputChannelName, selectedWorkspaceId);
                                  closeModal();
                                }}>
                                  Register
                                </Button>
                                </form>
                              </Modal>


              

          </div>
          
          <div className="main-content">

            <header className="header" style={{ position: "fixed", display: "flex", flexDirection: "row"}}>
              <p className="currentChannel">{currentChannelData?.channel_name}</p>
              <div className="Reply" onClick={()=>{
                fetchMessageData();
              }}>
                <ReplayIcon />
              </div>
                {/* ヘッダーのコンテンツ */}
            </header>


            <div className="chat-area" style={{ overflowY: "scroll" }}>
              {/* チャットエリアのコンテンツ */}


              <div style={{ display: "flex", flexDirection: "column" }} id="scroller_inner">
                <div className="chat_table" >
                  {messageDatas.map((data: messageData) => (
                    <div key={data.message_id} className="chat-contents">

                      <p className="chat_element">
                        {data.user_name} <span className="date">{data.created_at}</span> {data.is_edited == 1 && (
                          <span className="edited">編集済み</span>)}<br />
                        {data.contents}


                        {uid === data.user_id && (
                          <div className="menu">
                            {/* メニューのコンテンツ */}
                              <div className="edition">
                                <CreateIcon onClick={() => {
                                  setSelectedMessageId(data.message_id);
                                  setInputEditValue(data.contents)
                                  console.log(data.contents)
                                  openModal();
                                }}/>
                                <span>編集</span>
                              </div>
                              <Button 
                                variant="outlined" 
                                startIcon={<DeleteIcon />} 
                                size="small"
                                onClick={() => {
                                  onDeleteMessage(data.message_id)}}>
                                  Delete
                              </Button>

                              <Modal
                                contentLabel="Example Modal"
                                isOpen={showModal}
                                style={{
                                  overlay: {
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0)' // モーダルの背景色や透明度を指定する場合はここで設定
                                  },
                                  content: {
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '300px', // モーダルの幅を指定
                                    padding: '20px', // モーダルの内側の余白を指定
                                    backgroundColor: 'darkblue', // モーダルの背景色を指定
                                    borderRadius: '4px', // モーダルの角の丸みを指定
                                    borderColor: 'white'
                                  }
                                }}>                               
                                <button onClick={closeModal}>close</button>             
                                <form>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{
                                  backgroundColor: 'lightblue',
                                }} 
                                value = {inputEditValue} 
                                onChange={(e) => {
                                  setInputEditValue(e.target.value)
                                }}
                                />
                                <Button type={"submit"} variant="contained" endIcon={<SendIcon />} onClick={() => {
                                  console.log("edit用のmessage:", data.message_id)
                                  onEditMessage(selectedMessageId, inputEditValue)
                                  closeModal()
                                }}>
                                  Send
                                </Button>
                                </form>
                              </Modal>


                            </div>
                        )}
                        
                      </p>
                    </div>
                  ))}
                </div>
              </div>   
            </div>

            <div className="user-list" style={{ position: "fixed", padding: "0px" }}>
                {/* <ToggleButtonsMultiple /> */}
                <div className="inputform" style={{padding: "0px", height: "90%"}}>
                {currentChannelData !== undefined ? (
                  <Form
                    onSubmit={onSendMessage}
                    channelId={currentChannelData.channel_id}
                    userId={uid}
                  />
                ) : null}
                </div>
            </div>



          </div>

        </div>
      </div>
  );
};

export default Contents;
