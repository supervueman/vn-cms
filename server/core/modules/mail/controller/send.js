const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'mail', 403, 'send.js');
    sendRes({ res, status: 403 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS
    }
  });

  const info = await transporter
    .sendMail({
      // from: payload.from,
      // subject: payload.subject,
      // text: payload.text,
      // html: payload.html

      ...req.body,
      from: process.env.MAIL_AUTH_USER,
      to: req.email
    })
    .catch((err) => {
      logger('error', 'mail', 500, 'send.js', err);
      sendRes({ res, status: 500 });
    });

  sendRes({ res, status: 200 });
};
