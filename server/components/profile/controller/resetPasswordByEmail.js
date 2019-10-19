const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const resetToken = req.headers['x-reset-token'];
  const isResetToken = resetToken !== null && resetToken !== undefined && resetToken !== '' && resetToken !== 'null' && resetToken !== 'undefined';

  if (!isResetToken) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  await jwt.verify(resetToken, process.env.SECRET_KEY_FOR_JWT, async (err, decoded) => {
    if (err) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    if (!decoded) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    const user = await User.findOne({
      where: {
        email: decoded.email
      }
    });

    if (!user) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);

    await user.update({
      password: hashedPw
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
      to: decoded.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Ваша ссылка на изменение пароля", // plain text body
      html: '<h2>Ваш пароль изменен</h2>' // html body
    }).catch(err => {
      res.status(500);
      res.send({
        message: 'Not send!'
      });
    });

    res.status(200).send({
      message: 'Success!'
    });
  });
}
