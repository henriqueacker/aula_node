
const jwt = require("jsonwebtoken")

function criarToken(dadosToken) {
 
  const token = jwt.sign(dadosToken, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

function verificarToken(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expirado');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Token inválido');
    } else {
      throw new Error('Falha na verificação do token');
    }
  }
}


module.exports = {criarToken, verificarToken}