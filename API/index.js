const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(8080, ()=>{
    console.log("Servidor online na porta 8080")
})




