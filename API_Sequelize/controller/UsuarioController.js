const Usuario = require("../models/Usuario")
const express = require('express');
const { criarToken } = require("../utils/token");
const { auth } = require("../utils/middleware");
const router = express.Router();


router.post("/login", async(req,res)=>{
    try{
        const {email, senha} = req.body;

        if(!email || !senha){
            return res.status(400).json({error: "Parâmetros inválidos"})
        }
        const user = await Usuario.findOne({where:{email: email}})
        if (user && user.senha === senha) {
            const token = criarToken({ id: user.id, email: user.email });
            return res.status(200).json({ token: token });
        }
        return res.status(404).json({error: "Usuário/Senha inválidos"})
    }catch(error){
        console.error(error)
        return res.status(500).send("Error interno no servidor")
    }
})
router.post("/create", async(req,res)=>{
    try{
        const {nome, email, senha} = req.body

        if(!nome || !email || !senha){
            return  res.status(400).json({error: "Parâmetros inválidos"})
        }

       const user = await Usuario.create({
            nome,
            email,
            senha
        }).then((response)=>{
            const token = criarToken({id: response.id, email: response.email})
            return res.status(200).json({token: token})
        })

    }catch(error){
        console.error(error)
        return res.status(500).send("Error interno no servidor")
    }
})
router.get("/busca/:id", auth, async(req,res)=>{
    try{

    }catch(error){
        console.error(error)
        return res.status(500).send("Error interno no servidor")
    }
})

module.exports = router