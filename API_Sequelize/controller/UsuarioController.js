const Usuario = require("../models/Usuario")
const express = require('express');
const { criarToken } = require("../utils/token");
const { hashPassword, comparePasswords } = require("../utils/hash");
const { auth } = require("../utils/middleware");
const router = express.Router();


router.post("/login", async(req,res)=>{
    try{
        const {email, senha} = req.body;

        if(!email || !senha){
            return res.status(400).json({error: "Parâmetros inválidos"})
        }
        const user = await Usuario.findOne({where:{email: email}})
        const verficarSenha = await comparePasswords(senha, user.senha)
        if (verficarSenha) {
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
        const senhaHash = await hashPassword(senha)
        if(!nome || !email || !senha){
            return  res.status(400).json({error: "Parâmetros inválidos"})
        }
        const verificarSeUsuarioJaExiste  = await Usuario.findOne({
            where: {
                email
            }
        })
        if(verificarSeUsuarioJaExiste){
            return  res.status(400).json({error: "Email cadastrado já existe"})
        }
       const user = await Usuario.create({
            nome,
            email,
            senha: senhaHash
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
        const id = req.params.id
        const user = await Usuario.findByPk(id)
        
        return res.status(200).json({message: user})

    }catch(error){
        console.error(error)
        return res.status(500).send("Error interno no servidor")
    }
})

router.post("/recuperar-senha", async(req,res)=>{
    try{
        const {email} = req.body
        const user = await Usuario.findOne({where:{email}})
        const newPassword = gerarNovaSenhaAleatoria(10);
        const hashNewPassowrd = await hashPassword(newPassword)
        if(!user){
            return  res.status(400).json({error: "Usuário não encontrado"})
        }

        await user.update({
            senha: hashNewPassowrd
        })
        
        return res.status(200).json({message: "Senha alterada com sucesso, sua nova senha é: "+ newPassword})

    }catch(error){
        console.error(error)
        return res.status(500).send("Error interno no servidor" + error)
    }
})

function gerarNovaSenhaAleatoria(length) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let novaSenha = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      novaSenha += caracteres[randomIndex];
    }
  
    return novaSenha;
  }
module.exports = router