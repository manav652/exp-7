
import React,{useEffect,useState} from "react";
import axios from "axios";
import io from "socket.io-client";

const socket=io("http://localhost:5000");

function App(){
 const [products,setProducts]=useState([]);
 const [msg,setMsg]=useState("");
 const [chat,setChat]=useState([]);

 useEffect(()=>{
  axios.get("http://localhost:5000/api/products")
  .then(res=>setProducts(res.data));

  socket.on("message",(m)=>setChat(prev=>[...prev,m]));
 },[]);

 return (
  <div>
   <h1>Products</h1>
   {products.map((p,i)=><div key={i}>{p.name} - {p.price}</div>)}

   <h1>Chat</h1>
   {chat.map((c,i)=><div key={i}>{c}</div>)}

   <input value={msg} onChange={e=>setMsg(e.target.value)}/>
   <button onClick={()=>{socket.emit("message",msg); setMsg("")}}>Send</button>
  </div>
 );
}

export default App;
