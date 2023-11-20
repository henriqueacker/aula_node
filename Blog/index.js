const express = require('express')
const app = express();
const connection = require("./database/connection")
const categoriasController = require("./categorias/CategoriasController")
const artigosController = require("./categorias/CategoriasController")
const Categoria  = require("./categorias/Categoria")
const Artigo  = require("./artigos/Artigo")

app.use(express.static('public')) // Definindo public para arquivos estaticos
//Capturar os dados do formulario e receber json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//set de view
app.set('view engine', 'ejs')



app.use("/", categoriasController);
app.use("/", artigosController);

//ROTAS
app.get('/', (req, res)=>{
    res.render("layout", {pageContent: "home.ejs"})
})  



app.listen(8080, ()=>{
    console.log("Servidor online na porta 8080")
})

connection.authenticate().then(()=>{
    console.log("Conexão com banco de dados efetuada com sucesso")
}).catch((error)=>{
    console.log(error)
})