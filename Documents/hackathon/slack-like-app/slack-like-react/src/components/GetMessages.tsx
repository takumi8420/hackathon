
import { useState, useEffect } from "react";

// type Props = {
//   onSubmit: (name: string, age: number) => void;
// };

// const GetMessages = (props: Props) => {

//   const [data, setData] = useState([]);
//   const url = window.location.href;
//   const uid = url.substring(url.lastIndexOf("/") + 1);
//   console.log(uid);


//   type user ={
//      id: number;
//      name: string;
//      age: number;
//   }

//   const fetchData = async () => {
//     const getResponse = await fetch(`https://hackthon1-rzmhhbabrq-uc.a.run.app/search_user/${uid}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await getResponse.json();
//     console.log("get response is...", data);
//     setData(data);
//   };


// useEffect(() => {
//   fetchData();
// }, []);





//     // const onSubmit = async (name: string, age: number) => {

      
//     // try {
//     //   const result = await fetch("http://localhost:8000/user", {
//     //     method: "POST",
//     //     headers: {
//     //             "Content-Type": "application/json",
//     //           },
//     //     body: JSON.stringify({
//     //       name: name,
//     //       age: age,
//     //     }),
//     //   });
//     //   if (!result.ok) {
//     //     throw Error(`Failed to create user: ${result.status}`);
//     //   }

//     //   // setName("");
//     //   // setAge(0);
//     // } catch (err) {
//     //   console.error(err);
//     // }


//     // const getResponse = await fetch("http://localhost:8000/user", {
//     //   method: "GET",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     // });
//     // const data = await getResponse.json();

//   //   fetchData();

//   //   console.log("get response is...", data);
//   //   setData(data);
//   // };

//   return (
//     <div style={{ display: "flex", flexDirection:  "column"}}>
//       <div className="App">
//         <header className="App-header">
//           <div>
//             <h1>User Register</h1>
//           </div>
//         </header>
//         <Form
//          onSubmit={onSubmit} 
//          />
//       </div>

//       <div className = "table">
//       {data.map((user: user) => (
//         <div key={user.id}>
//         <p className="element">Name: {user.name} Age: {user.age}</p>
//       </div>
//       ))}
//       </div>
//     </div>

//   );
// };

// export default GetMessages;