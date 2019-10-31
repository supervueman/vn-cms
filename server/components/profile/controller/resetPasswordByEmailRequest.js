const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!user) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }
  delete user.password;

  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.SECRET_KEY_FOR_JWT, {
    expiresIn: '1h'
  });

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS
    }
  });

  const info = await transporter.sendMail({
    from: "<chaogen2@example.com>", // sender address
    to: req.body.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Ваша ссылка на изменение пароля", // plain text body
    html: `<a href="${req.headers.origin}/reset-password?token=${token}">${req.headers.origin}/reset-password?token=${token}</a>` // html body
  }).catch(err => {
    res.status(500);
    res.send({
      message: 'Not send!'
    });
    return;
  });

  res.status(200).send({
    message: 'Success!'
  });
}
