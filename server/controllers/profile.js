const bcrypt = require('bcrypt');
const validator = require('validator');
const fs = require('fs');

// Models
const User = require('../models/user');

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

  async create(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
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

    const createdUser = await User.create({
      ...req.body,
      password: hashedPw,
      userId: req.profile.id
    });

    res.status(200).send(createdUser);
  },

  async update(req, res) {
    const updateProfileData = req.body.profile;
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
    newProfile.password = '';

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
      res.status(401).send({
        message: 'Пользователь не найден!'
      });
    }

    await User.destroy({
      where: {
        id: req.profile.id
      }
    });

    res.status(204).send({
      message: 'Успешно удалено!'
    });
  }
}
