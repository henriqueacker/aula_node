const Post = require("../models/Post")
const express = require('express')
const router = express.Router();
const { auth } = require("../utils/middleware");
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.status(200).json(posts)
    } catch {
        return res.status(500).send("Erro interno do servidor")
    }
})
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByPk(id)
        if (!post) {
            return res.status(404).json({ error: "Post não encontrado" })
        }
        return res.status(200).json(post)
    } catch {
        return res.status(500).send("Erro interno do servidor")
    }
})
router.post("/new",auth, async (req, res) => {
    try {
        const titulo = req.body.titulo
        const texto = req.body.texto
        const user = req.loggedUser
        if (!titulo || !texto) {
            return res.status(400).json({ error: "Parâmetros inválidos" })
        }

        await Post.create({
            titulo,
            texto,
            id_usuario: user.id
        })
        return res.status(201).json({ message: "Post criado com sucesso!" })

    } catch (error) {
        console.error(error)
        return res.status(500).send("Erro interno do servidor")
    }
})
router.put("/edit/:id", async (req, res) => {
    try {
        const titulo = req.body.titulo
        const texto = req.body.texto
        const id = req.params.id
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post não encontrado" })
        }
        await Post.update({ titulo, texto }, {
            where: {
                id
            }
        })

        return res.status(200).json({ message: "Post alterado com sucesso" })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Erro interno do servidor")
    }
})
router.delete("/delete/:id", async (req, res) => {
    try {

        const id = req.params.id
        const post = await Post.destroy({
            where: {
                id
            }
        });
        if (!post) {
            return res.status(404).json({ error: "Post não encontrado" })
        }

        return res.status(200).json({ message: "Post excluído com sucesso" })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Erro interno do servidor")
    }
})


module.exports = router



