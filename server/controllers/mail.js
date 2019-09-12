const nodemailer = require('nodemailer');

module.exports = {
  async send(req, res) {
    if (!(req.profile)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
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

    const info = await transporter.sendMail(req.body).catch(err => {
      res.status(500);
      res.send({
        message: 'Not send!'
      });
    });

    res.status(200).send({
      message: 'Success!'
    });
  },
}
