const {DataTypes} = require("sequelize")
const connection = require("../database/connection")
const Categoria = require("../categorias/Categoria")

const Artigo = connection.define("artigos",{
    title:{
        type: DataTypes.STRING,
        allow: false
    },
    slug: {
        type: DataTypes.STRING,
        allow: false
    },
    body: {
        type: DataTypes.TEXT,
        allow: false
    }
})
Artigo.belongsTo(Categoria, { foreignKey: 'id_categoria' })
Artigo.sync({force: false})

module.exports = Artigo