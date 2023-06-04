import { useState } from "react";
import { useHistory } from 'react-router-dom';

type Props = {
  onSubmit: (name: string, age: number) => void;
};





const RegisterForm = (props: Props) => {


  

////////////////////////////////////////////////

  const [name, setName] = useState("");
  const [age, setAge] = useState(parseInt(""));

  const submit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // props.onSubmit(e);
    props.onSubmit(name, age);
      if (!name) {
        alert("Please enter name");
      return;
    }
    if (name.length > 50) {
      alert("Please enter a name shorter than 50 characters");
      return;
    }
    if (age < 20 || age > 80) {
      alert("Please enter age between 20 and 80");
      return;
    }
    setName("");
    setAge(parseInt(""));
  };

  return (
    <form style={{ display: "flex", flexDirection:  "column"}} onSubmit={submit}>

    <div style={{ display: "flex", width: "70%", margin: "10px 20%"}}>

      <label className = "labelname" style={{width: "200px", height: "30px", fontSize: "20px", marginLeft: "20%"}}>Name: </label>
      <input type={"text"} value={name} onChange={(e) => setName(e.target.value)} style={{marginRight: "20%" , width: "200px"}}
      ></input>
    </div>
      
    <div style={{ display: "flex", width: "70%", margin: "10px 20%"}} >
      <label className = "labelAge" style={{width: "200px", height: "30px", fontSize: "20px", marginLeft: "20%"}}>Age: </label>
      <input
        type={"number"}
        // style={{ marginBottom: 20 }}
        value={age}
        onChange={(e) => {
          setAge(parseInt(e.target.value))
        }}
        style={{marginRight: "20%",width: "200px"}}
        ></input>
    </div>
    <div>
      <button type={"submit"}  style ={{width: "30vh", height: " 40px"}}>POST</button>
    </div>

    </form>
  );
};

export default RegisterForm;