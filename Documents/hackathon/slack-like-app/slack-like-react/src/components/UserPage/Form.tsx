import { useState } from "react";
import { Button } from "@mui/material";
import { Send as SendIcon, WidthFull } from '@mui/icons-material';
import './Form.css';
import IconButton from '@mui/material/IconButton';
import ToggleButtonsMultiple from "./compo/inputFormOption"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


type Props = {
   onSubmit: (channelId: string, userId: string, message: string) => void;
   channelId: string;
   userId: string;
};


const Form = (props: Props) => {
  const [messageToSendData, setMessageToSendData] = useState("")
  const uid = props.userId

  



  const submit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // props.onSubmit(e);
    props.onSubmit(props.channelId, uid, messageToSendData);
      if (!messageToSendData) {
        alert("Please enter name");
      return;
    }
    setMessageToSendData("");
  };

  return (

<form style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", backgroundColor: "azure" }} className="message" onSubmit={submit}>
  {/* <div style={{ flex: "1", backgroundColor: "#2f0364" }}></div> */}

  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>

      <div className="ToggleButtonsMultiple" style={{ marginLeft: "0px", marginRight: "auto" }}>
        <ToggleButtonsMultiple />
      </div>

      <Button
        type="submit"
        variant="contained"
        style={{ height: "40px", width: "40px", marginLeft: "auto", marginRight: "0px" }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          minWidth: 'auto',
          marginBottom: 0,
        }}
      >
        <IconButton
          size="small"
          sx={{
            padding: 0,
            margin: '0 !important',
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Button>

    </div>

    <div style={{ display: "flex", justifyContent: "center", width: "100%"}}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          width: '100%',
          height: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Filled"
          variant="standard"
          style={{ width: "calc(100vw - 200px)", height: "40px", backgroundColor: "azure", padding: "0px", color: "white" }}
          type="text"
          value={messageToSendData}
          onChange={(e) => {
            setMessageToSendData(e.target.value);
          }}
        />
      </Box>
    </div>

  </div>
</form>
  );
};

export default Form;