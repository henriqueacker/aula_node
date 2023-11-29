const express = require('express')
const cors = require("cors")
const app = express();
const postController = require("./controller/PostController")
const usuarioController = require("./controller/UsuarioController")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(8080, ()=>{
    console.log("Servidor online na porta 8080")
})
app.use(cors());
app.use("/post", postController);
app.use("/user", usuarioController);




