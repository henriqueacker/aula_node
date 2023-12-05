const express = require("express")
const app = express();
const http = require("http").createServer(app)
const port = 8080
const io = require("socketio")(http)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

io.on("connection",(socket)=>{
    socket.on("disconnect", (data) =>{
       console.log(socket.id)
    })

    socket.on("mensagem", (data)=>{
        io.emit("showMensagens", data)
    })
})


http.listen(port,()=>{
    console.log("APP RODANDO!!")
})