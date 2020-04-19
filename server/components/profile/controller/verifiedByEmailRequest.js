const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const validator = require('validator');

const User = require('../../user/model');

module.exports = async (req, res) => {
  if (
    !validator.isEmail(req.body.newEmail) &&
    !validator.isEmail(req.body.currentEmail)
  ) {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  const user = await User.findOne({
    where: {
      email: req.body.currentEmail
    }
  });

  if (!user) {
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (user.verified && user.email === req.body.email) {
    res.status(200).send({
      message: 'OK'
    });
    return;
  }

  await user.update({
    verified: false
  });

  const token = jwt.sign(
    {
      id: user.id,
      newEmail: req.body.newEmail,
      currentEmail: user.email
    },
    process.env.SECRET_KEY_FOR_JWT_VERIFIED_PROFILE,
    {
      expiresIn: '24h'
    }
  );

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
      to: req.body.newEmail, // list of receivers
      subject: 'Your verified link', // Subject line
      text: 'Your verified link', // plain text body
      html: `<h1 style="box-sizing: border-box;">Click this button to verified account!</h1>
            <a
              style="
                box-sizing: border-box;
                width: 250px;
                background-color: red;
                color: #fff;
                text-transform: uppercase;
                text-decoration: none;
                text-align: center;
                font-size: 20px;
                font-family: sans-serif;
                border-radius: 3px;
                padding: 10px 0;
                display: block;
              "
              href="${req.headers.origin}/profile/verified?token=${token}"
            >
              Verified
            </a>` // html body
    })
    .catch((err) => {
      res.status(500);
      res.send({
        message: 'Not send'
      });
      return;
    });

  if (req.body.newEmail !== user.email) {
    const backtoken = jwt.sign(
      {
        id: user.id,
        newEmail: user.email,
        currentEmail: req.body.newEmail
      },
      process.env.SECRET_KEY_FOR_JWT_VERIFIED_PROFILE,
      {
        expiresIn: '24h'
      }
    );

    const info = await transporter
      .sendMail({
        from: `<${process.env.MAIL_AUTH_USER}>`, // sender address
        to: user.email, // list of receivers
        subject: 'Security Alert', // Subject line
        text: 'Security Alert', // plain text body
        html: `<h1 style="box-sizing: border-box;">Click this button to verified account!</h1>
            <p>There was an attempt to change the email address.</p>
            <p>If it was you, then ignore this letter.</p>
            <p>Otherwise, follow the link below to reset the email address.</p>
            <p>After recovering the email address, we recommend changing the password.</p>
            <a
              style="
                box-sizing: border-box;
                width: 250px;
                background-color: red;
                color: #fff;
                text-transform: uppercase;
                text-decoration: none;
                text-align: center;
                font-size: 20px;
                font-family: sans-serif;
                border-radius: 3px;
                padding: 10px 0;
                display: block;
              "
              href="${req.headers.origin}/profile/verified?token=${backtoken}"
            >
              Verified
            </a>` // html body
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message: 'Not send'
        });
        return;
      });
  }

  res.status(200).send({
    message: 'OK'
  });
};
