const Usuario = require("../models/Usuario")
const express = require('express')
const router = express.Router();


router.post("/login", async(req,res)=>{
    try{
        const {usuario, senha} = req.body;

        if(!usuario || !senha){
            res.status(400).json({error: "Parâmetros inválidos"})
        }

        res.status(200).json({message: "Logado com sucesso" + process.env.JWT_SECRET})
    }catch(error){
        console.error(error)
        res.status(500).send("Error interno no servidor")
    }
})
router.post("/create", async(req,res)=>{
    try{

    }catch(error){
        console.error(error)
        res.status(500).send("Error interno no servidor")
    }
})
router.get("/busca/:id", async(req,res)=>{
    try{

    }catch(error){
        console.error(error)
        res.status(500).send("Error interno no servidor")
    }
})

module.exports = router