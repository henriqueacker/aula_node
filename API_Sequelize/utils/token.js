import jwt from 'jsonwebtoken';
// Função para criar um token de autenticação
export function criarToken(dadosToken) {
 
  const token = jwt.sign(dadosToken, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

export function verificarToken(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }