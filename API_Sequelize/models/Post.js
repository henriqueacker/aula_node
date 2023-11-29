const {DataTypes} =   require("sequelize")
const connection = require("../database/connection")

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

Post.sync({force: false})

module.exports = Post
