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
      message: 'Not found'
    });
    return;
  }
  delete user.password;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.SECRET_KEY_FOR_JWT_RESET_PASSWORD,
    {
      expiresIn: '1h'
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
      to: req.body.email, // list of receivers
      subject: 'Your password reset link', // Subject line
      text: 'Your password reset link', // plain text body
      html: `<h1 style="box-sizing: border-box;">Click this button to change the password!</h1>
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
              href="${req.headers.origin}/reset-password?token=${token}"
            >
              Change password
            </a>` // html body
    })
    .catch((err) => {
      res.status(500);
      res.send({
        message: 'Not send'
      });
      return;
    });

  res.status(200).send({
    message: 'OK'
  });
};
