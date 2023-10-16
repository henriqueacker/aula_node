const {DataTypes} = require('sequelize')
const connection = require('../database')
const Pergunta = require('../models/Pergunta')

const Resposta = connection.define('resposta', {
    resposta :{
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_pergunta:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Resposta.belongsTo(Pergunta, { foreignKey: 'id_pergunta' });
Resposta.sync({force: false})

module.exports = Resposta;