const nodemailer = require('nodemailer');

async function enviarEmailNovaSenha(destinatario, novaSenha) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_MAILER,
      port: 2525,
      auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER
      },
      connectionTimeout: 5000,
      socketTimeout: 30000,
    });

    const mailOptions = {
      from: process.env.EMAIL_MAILER,
      to: destinatario,
      subject: 'Nova Senha - Recuperação de Senha',
      text: `Sua nova senha é: ${novaSenha}`
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { enviarEmailNovaSenha };
