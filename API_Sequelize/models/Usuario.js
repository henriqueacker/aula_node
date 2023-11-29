const { DataTypes} = require("sequelize")
const connection = require("../database/connection")


const Usuario = connection.define("Usuario",{
    nome: {
        type: DataTypes.STRING,
        allow: false
    },
    email:{
        type: DataTypes.STRING,
        allow: false
    },
    senha:{
        type: DataTypes.STRING,
        allow: false
    }
})

Usuario.sync({force: false})

module.exports = Usuario