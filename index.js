const express = require('express') //import do express
const app = express(); //iniciando o express
app.set('view engine', 'ejs') // Defenindo o render de HTML
app.use(express.static('public')) // Definindo public

//ROTAS
app.get('/', (req, res)=>{
    let nome = "Teste"
    res.render('home', {
        nome
    })
})

app.get('/sobre', (req, res)=>{
    res.render('sobre')
})











//CONFIG DO SERVIDOR
app.listen(3000,(error)=>{
    if(error){
       return console.log(error)
    }
    console.log("Servidor online")
})




