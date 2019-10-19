const bcrypt = require('bcrypt');
const validator = require('validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Models
const User = require('../components/user/model');

// Handlers
const createDir = require('../handlers/createDir');
const removeDir = require('../handlers/removeDir');

module.exports = {
  async findByAccessToken(req, res) {
    if (!req.profile) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(req.profile);
  },

  async createByEmail(req, res) {
    if (!req.rules.is_user_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
    }

    const existUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (existUser) {
      res.status(401).send({
        message: 'User is exist!'
      });
    }

    if (!validator.isEmail(req.body.email)) {
      res.status(401).send({
        message: 'E-mail is invalid!'
      });
    }

    if (validator.isEmpty(req.body.password) || !validator.isLength(req.body.password, {
        min: 6
      })) {
      res.status(401).send({
        message: 'Password is short!'
      });
    }

    if (validator.isEmpty(req.body.slug) || !validator.isLength(req.body.slug, {
        min: 3
      })) {
      res.status(401).send({
        message: 'Slug is short!'
      });
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);

    const userCreated = {
      ...req.body,
      password: hashedPw,
      userId: req.profile.id
    }
    if (!req.managerAccess && !req.adminAccess) {
      userCreated.userId = req.profile.userId;
    }

    const createdUser = await User.create(userCreated).catch(err => {});

    if (req.adminAccess) {
      await createDir(`../files/user-${createdUser.id}`);
    } else if (req.managerAccess) {
      await createDir(`../files/user-${req.profile.id}/user-${createdUser.id}`);
    } else {
      await createDir(`../files/user-${req.profile.userId}/user-${createdUser.id}`);
    }

    res.status(200).send(createdUser);
  },

  async createByPhone(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Access denied!'
      });
    }

    const existUser = await User.findOne({
      where: {
        phone: req.body.phone
      }
    });

    if (existUser) {
      res.status(401).send({
        message: 'User is exist!'
      });
    }

    if (!validator.isMobilePhone(req.body.phone, ['ru-RU', 'us-US'])) {
      res.status(401).send({
        message: 'Phone is invalid!'
      });
    }

    if (validator.isEmpty(req.body.password) || !validator.isLength(req.body.password, {
        min: 6
      })) {
      res.status(401).send({
        message: 'Password is short!'
      });
    }

    if (validator.isEmpty(req.body.slug) || !validator.isLength(req.body.slug, {
        min: 3
      })) {
      res.status(401).send({
        message: 'Slug is short!'
      });
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);

    const createdUser = await User.create({
      ...req.body,
      password: hashedPw,
      userId: req.profile.id
    });

    await createDir(`../files/${createdUser.id}`);

    res.status(200).send(createdUser);
  },

  async update(req, res) {
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const updateProfileData = req.body;
    delete updateProfileData.password;
    delete updateProfileData.token;
    delete updateProfileData.id;
    delete updateProfileData.role;

    if (!req.profile) {
      res.status(401).send({
        message: 'User not found!'
      });
    }

    const newProfile = await req.profile.update(updateProfileData);

    res.status(200).send(newProfile);
  },

  async changePassword(req, res) {
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const isCompare = await bcrypt.compare(req.body.oldPassword, req.profile.password);

    if (!isCompare) {
      res.status(401).send({
        message: 'Пароли не совпадают!'
      });
    } else {
      const hashPw = await bcrypt.hash(req.body.newPassword, 12);

      await req.profile.update({
        password: hashPw
      });

      res.status(200).send({
        message: 'Пароль успешно обновлен!'
      });
    }
  },

  async resetPasswordByEmailRequest(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      res.status(404).send({
        message: 'Not found!'
      });
    }
    delete user.password;

    const token = jwt.sign({
      uid: user.id.toString(),
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
    });

    res.status(200).send({
      message: 'Success!'
    });
  },

  async resetPasswordByEmail(req, res) {
    const resetToken = req.headers['x-reset-token'];
    const isResetToken = resetToken !== null && resetToken !== undefined && resetToken !== '' && resetToken !== 'null' && resetToken !== 'undefined';

    if (!isResetToken) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    await jwt.verify(resetToken, process.env.SECRET_KEY_FOR_JWT, async (err, decoded) => {
      if (err) {
        res.status(404).send({
          message: 'Not found!'
        });
      }

      if (!decoded) {
        res.status(404).send({
          message: 'Not found!'
        });
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
  },

  async remove(req, res) {
    if (!req.profile) {
      res.status(404).send({
        message: 'Пользователь не найден!'
      });
    }

    removeDir(`../files/${req.profile.id}`);

    await User.destroy({
      where: {
        id: req.profile.id
      }
    });

    res.status(200).send({
      message: 'Успешно удалено!'
    });
  }
}
