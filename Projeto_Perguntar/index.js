//IMPORT DE MODELS E CRIAÇÃO DELAS NO BANCO DE DADOS
const Pergunta = require('./database/models/Pergunta')

const connection = require('./database/database')
const express = require('express'); //import do express
const Resposta = require('./database/models/Resposta');
const app = express(); //iniciando o express
app.set('view engine', 'ejs') // Definindo o render de HTML
app.use(express.static('public')) // Definindo public para arquivos estaticos

//Capturar os dados do formulario e receber json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



//ROTAS
app.get('/', (req, res) => {
    Pergunta.findAll({
        // attributes: ['titulo', 'descricao'],
        order: [['createdAt', 'DESC']],
    }).then((response) => {
        res.render("layout", {
            perguntas: response,
            pageContent: 'home.ejs'
        });
    });
});


app.get('/perguntar', (req, res) => {
    res.render('layout', { pageContent: 'perguntar.ejs' });
})



app.post('/salvarPergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')

    })
})
app.post('/responderPergunta', (req, res) => {
    const id = req.body.id
    const resposta = req.body.resposta
    Resposta.create({
        id_pergunta: id,
        resposta: resposta
    }).then(() => {
        res.redirect('/pergunta/' + id)

    })
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: { id: id }
    }).then((response) => {
        if (response) {
            Resposta.findAll({
                where: { id_pergunta: id }
            }).then((respostas)=>{
                res.render("layout", {
                    pergunta: response,
                    pageContent: 'pergunta.ejs',
                    respostas: respostas
                })
            })
        } else {
            res.redirect("/")
        }
    }).catch((error) => {
        console.error(error)
    })

})


    //Teste de conexão do banco de dados
    try {
        connection.authenticate()
        console.log('Conectado ao banco de dados com sucesso')
    } catch (error) {
        console.log("Falha de conexão do banco de dados" + error)
    }


    //CONFIG DO SERVIDOR
    app.listen(3001, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log("Servidor online")
    })




