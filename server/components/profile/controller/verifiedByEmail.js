const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const verifiedToken = req.headers['x-verified-token'];
  const isVerifiedToken =
    verifiedToken !== null &&
    verifiedToken !== undefined &&
    verifiedToken !== '' &&
    verifiedToken !== 'null' &&
    verifiedToken !== 'undefined';

  if (!isVerifiedToken) {
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  await jwt.verify(
    verifiedToken,
    process.env.SECRET_KEY_FOR_JWT_VERIFIED_PROFILE,
    async (err, decoded) => {
      if (err || !decoded) {
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
        res.status(404).send({
          message: 'Not found'
        });
        return;
      }

      if (user.verified) {
        res.status(200).send({
          message: 'OK'
        });
        return;
      }

      await user.update({
        verified: true
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
          subject: 'Your account is verified!', // Subject line
          text: 'Your account is verified!', // plain text body
          html: '<h1>Your account is verified!</h1>' // html body
        })
        .catch((err) => {
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
