import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./image.svg";
import "./imageUpload.css"
import { storage } from "../../../../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage"
import { getDownloadURL } from "firebase/storage";
import { useHistory } from 'react-router-dom';


const ImageUploader = () => {

  const url = window.location.href;
  let uid = url.substring(url.lastIndexOf("/") + 1);
  uid = uid.slice(0, 26);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const onRegisterUserPhotoURL = async (uid: string, PhotoURL: string) => {
    try{
      const result = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/register_userPhotoURL/${uid}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: uid,
          user_photoURL: PhotoURL,
        }),
      });
        if (!result.ok) {
          throw Error(`Failed to create channel: ${result.status}`);
        }
      } catch (err) {
        console.error(err);
      }
      console.log("urlの登録が完了しました。")
      
    }




  const backToContentsPage = async (uid: string)=>{
    history.push(`/UserPage/${uid}`);
  }



  const OnFireUploadToFirebase = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const storageRef = ref(storage, "image/" + file.name);
      const uploadImage = uploadBytesResumable(storageRef, file);

      uploadImage.on("state_changed", (snapshot) => {
        setLoading(true);
        },
        (err)=>{
          console.log(err);
        },
        async () => {
          setLoading(false);
          setIsUploaded(true);
          const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);
          console.log("Download URL:", downloadURL);
          onRegisterUserPhotoURL(uid, downloadURL)
        }
      )

    }
  };
  return (
    <>
    {loading ? (<h2>アップロード中・・・</h2>
    ) : (
      <>
      {isUploaded ? (
        <>
        <h2>アップロード完了</h2>
        <div>
          <Button variant="contained" onClick={(e)=>{
            e.preventDefault();
            backToContentsPage(uid);
          }}>
            自分のページに戻る
          </Button>
        </div>
        </>
      ) : (
      <div className="outerBox">
        <div className="title">
          <h2>画像アップローダー</h2>
          <p>JpegかPngの画像ファイル</p>
        </div>
        <div className="imageUplodeBox">
          <div className="imageLogoAndText">
            <img src={ImageLogo} alt="imagelogo" />
            <p>ここにドラッグ＆ドロップしてね</p>
          </div>
          <input 
            className = "imageUploadInput" 
            multiple 
            name = "imageURL" 
            onChange = {OnFireUploadToFirebase}
            type = "file"
            accept = ".png, .jpeg, .jpg"
          />
        </div>
        <p>または</p>
        <Button variant="contained">
          ファイルを選択
          <input 
            className="imageUploadInput" 
            type="file"
            onChange={OnFireUploadToFirebase}
            accept = ".png, .jpeg, .jpg"
            />
        </Button>
      </div>
      )}
      </>
    )}    
    </>
  );
};

export default ImageUploader;