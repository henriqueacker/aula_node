const {DataTypes} = require("sequelize")
const connection = require("../database/connection")


const Categoria = connection.define("categorias",{
    title:{
        type: DataTypes.STRING,
        allow: false
    },
    slug: {
        type: DataTypes.STRING
    }
})



Categoria.sync({force: true})
module.exports = Categoria