const {DataTypes} =   require("sequelize")
const connection = require("../database/connection")
const Usuario = require("../models/Usuario")
const Post = connection.define("Post",{
    titulo :{
        type: DataTypes.STRING,
        allow: false
    },
    texto :{
        type: DataTypes.TEXT,
        allow: false
    }
})
Post.belongsTo(Usuario, {foreignKey :'id_usuario'})
Post.sync({force: false})

module.exports = Post
