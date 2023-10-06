const connection  = require('./database/database')
const express = require('express') //import do express
const app = express(); //iniciando o express
app.set('view engine', 'ejs') // Definindo o render de HTML
app.use(express.static('public')) // Definindo public para arquivos estaticos

//Capturar os dados do formulario e receber json
app.use(express.urlencoded({extended: true}))
app.use(express.json())



//ROTAS
app.get('/', (req, res)=>{
    let nome = "Teste"
    res.render('home', {
        nome
    })
})

app.get('/perguntar', (req, res)=>{
    res.render('layout', { pageContent: 'perguntar.ejs' });
})



app.post('/salvarPergunta', (req, res)=>{
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    res.send(titulo)
})




//Teste de conexão do banco de dados
try{
    connection.authenticate()
    console.log('Conectado ao banco de dados com sucesso')
}catch(error){
    console.log("Falha de conexão do banco de dados"+ error)
}


//CONFIG DO SERVIDOR
app.listen(3000,(error)=>{
    if(error){
       return console.log(error)
    }
    console.log("Servidor online")
})




