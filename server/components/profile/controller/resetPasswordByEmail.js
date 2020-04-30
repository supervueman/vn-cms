const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const resetToken = req.headers['x-reset-token'];
  const isResetToken =
    resetToken !== null &&
    resetToken !== undefined &&
    resetToken !== '' &&
    resetToken !== 'null' &&
    resetToken !== 'undefined';

  if (!isResetToken) {
    logger(
      'error',
      'profile',
      404,
      'resetPasswordByEmail.js',
      'reset-token not found'
    );
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  await jwt.verify(
    resetToken,
    process.env.SECRET_KEY_FOR_JWT_RESET_PASSWORD,
    async (err, decoded) => {
      if (err || !decoded) {
        logger('error', 'profile', 404, 'resetPasswordByEmail.js', err);
        res.status(404).send({
          message: 'Not found'
        });
        return;
      }

      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      });

      if (!user) {
        logger('error', 'profile', 404, 'resetPasswordByEmail.js');
        res.status(404).send({
          message: 'Not found'
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

      const info = await transporter
        .sendMail({
          from: `<${process.env.MAIL_AUTH_USER}>`, // sender address
          to: decoded.email, // list of receivers
          subject: 'Your password has been successfully changed!', // Subject line
          text: 'Your password has been successfully changed!', // plain text body
          html: '<h1>Your password has been successfully changed!</h1>' // html body
        })
        .catch((err) => {
          logger('error', 'profile', 500, 'resetPasswordByEmail.js', err);
          res.status(500);
          res.send({
            message: 'Not send'
          });
        });

      res.status(200).send({
        message: 'OK'
      });
    }
  );
};
