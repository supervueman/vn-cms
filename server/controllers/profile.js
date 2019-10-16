const bcrypt = require('bcrypt');
const validator = require('validator');

// Models
const User = require('../models/user');

// Handlers
const createDir = require('../handlers/createDir');
const removeDir = require('../handlers/removeDir');

module.exports = {
  async findByAccessToken(req, res) {
    if (!req.profile) {
      res.status(401).send({
        message: 'User not found!'
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

    await createDir(`../files/${createdUser.id}`);

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
