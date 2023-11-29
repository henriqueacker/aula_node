const { verificarToken } = require("./token")

function auth(req, res, next){
    const authTokken = req.headers['authorization']
    const tokken = authTokken.split(" ")
    const authorization = verificarToken(tokken[1])

    if(!authTokken){
        return res.status(401).json({error: "Token inválido"})
    }
   
    if(authorization){
        next()
    }else{
        return res.status(401).json({error: "Token inválido"})
    }
  
}

module.exports = {auth}