
const express=require("express");
const app=express();
const http=require("http").createServer(app);
const io=require("socket.io")(http,{cors:{origin:"*"}});

app.use(require("cors")());
app.use(express.json());

app.get("/api/products",(req,res)=>{
 res.json([{name:"Phone",price:100},{name:"Tablet",price:200}]);
});

io.on("connection",(socket)=>{
 console.log("User connected");

 socket.on("message",(msg)=>{
  io.emit("message",msg);
 });

 socket.on("disconnect",()=>console.log("User left"));
});

http.listen(5000,()=>console.log("Backend running"));
