const express = require('express') //import do express
const app = express(); //iniciando o express
app.set('view engine', 'ejs') // Defenindo o render de HTML
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







//CONFIG DO SERVIDOR
app.listen(3000,(error)=>{
    if(error){
       return console.log(error)
    }
    console.log("Servidor online")
})




