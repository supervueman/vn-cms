const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Role = require('../models/role');

module.exports = {
  async findByAccessToken(req, res) {
    if (!req.profile) {
      res.status(401).send({
        message: 'Пользователь не найден!'
      });
    }

    res.status(200).send(req.profile);
  },

  async create(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа для создания пользователя!'
      });
    }

    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (existingUser) {
      res.status(401).send({
        message: 'User is exist!'
      });
    }

    if (!validator.isEmail(req.body.email)) {
      res.status(401).send({
        message: 'E-mail in invalid!'
      });
    }

    if (validator.isEmpty(req.body.password) || !validator.isLength(req.body.password, {
        min: 6
      })) {
      res.status(401).send({
        message: 'Password short!'
      });
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);

    try {
      const createdUser = await User.create({
        ...req.body,
        password: hashedPw,
        userId: req.profile.id
      });

      if (createdUser) {
        res.status(201).send(createdUser);
      }
    } catch (err) {
      res.status(401).send({
        message: err.errors[0].message
      });
    }

    res.status(500).send({
      message: 'Server error!'
    });
  },

  async update(req, res) {
    const updateProfileData = req.body;

    delete updateProfileData.password;
    delete updateProfileData.token;
    delete updateProfileData.id;
    delete updateProfileData.role;

    if (!req.profile) {
      res.status(401).send({
        message: 'Пользователь не найден!'
      });
    }

    req.profile.update(updateProfileData);
    req.profile.password = '';

    res.status(200).send(req.profile);
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
