const express = require('express')
require('dotenv').config();

const cors = require("cors")
const app = express();
const postController = require("./controller/PostController")
const usuarioController = require("./controller/UsuarioController")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(process.env.SERVER_PORT, ()=>{
    console.log("Servidor online na porta " + process.env.SERVER_PORT)
})
app.use(cors());
app.use("/post", postController);
app.use("/user", usuarioController);




