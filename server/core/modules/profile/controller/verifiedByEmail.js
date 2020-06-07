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
    logger(
      'error',
      'profile',
      404,
      'verifiedByEmail.js',
      'verified-token is not found'
    );
    sendRes({ res, status: 404 });
  }

  await jwt.verify(
    verifiedToken,
    process.env.SECRET_KEY_FOR_JWT_VERIFIED_PROFILE,
    async (err, decoded) => {
      if (err || !decoded) {
        logger('error', 'profile', 404, 'verifiedByEmail.js', err);
        sendRes({ res, status: 404 });
      }

      const user = await User.findOne({
        where: {
          email: decoded.currentEmail
        }
      });

      if (!user) {
        logger('error', 'profile', 404, 'verifiedByEmail.js');
        sendRes({ res, status: 404 });
      }

      if (user.verified && user.email === decoded.newEmail) {
        sendRes({ res, status: 200 });
      }

      await user.update({
        email: decoded.newEmail,
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
          to: decoded.newEmail, // list of receivers
          subject: 'Your account is verified!', // Subject line
          text: 'Your account is verified!', // plain text body
          html: '<h1>Your account is verified!</h1>' // html body
        })
        .catch((err) => {
          logger('error', 'profile', 500, 'verifiedByEmail.js', err);
          sendRes({ res, status: 500 });
        });

      sendRes({ res, status: 200 });
    }
  );
};
