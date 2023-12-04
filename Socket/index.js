const express = require("express")
const app = express()
const http = require("http").createServer(app);
const io =  require("socket.io")(http)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")



app.get("/", (req, res)=>{
    res.render("index")
})

io.on("connection",(socket)=>{
    socket.on("disconnect", (data) =>{
       console.log(socket.id)
    })

    socket.on("msg", (data)=>{
        console.log(data)
        io.emit("showmsg", data)
    })
})

http.listen(3000,()=>{
    console.log("Servidor online")
})