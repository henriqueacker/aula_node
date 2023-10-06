# Nodemon - Utilizado para iniciar o servidor

```bash
npm install nodemon -g
```

- Comando para iniciar o servidor:
    nodemon (nome do arquivo)

# Configurações de engine e arquivos estaticos
- app.set('view engine', 'ejs') // Definindo a engine que  irá renderizar o HTML
- app.use(express.static('public')) // Definindo public para arquivos estaticos como por exemplo: css

# configurando para capturar os dados do formulario e receber json
- app.use(express.urlencoded({extended: true}))
- app.use(express.json())


# Fazendo as configurações do servidor
```
app.listen(3000,(error)=>{
    if(error){
       return console.log(error)
    }
    console.log("Servidor online")
})
```

