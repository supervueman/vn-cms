const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Role = require('../models/role');

module.exports = {
  async create(req, res) {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      },
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
        password: hashedPw
      });

      if (createdUser) {
        res.status(201).send({
          message: 'User create success!'
        });
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

  async fetch(req, res) {
    if (req.headers['x-access-token'] === 'null' || req.headers['x-access-token'] === '') {
      res.status(401).send({
        message: 'Access token is not valid!'
      });
    }

    const decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT);

    if (!decoded) {
      res.status(401).send({
        message: 'Not authorized!'
      });
    }

    const profile = await User.findByPk(decoded.uid, {
      include: [{
        model: Role
      }]
    });
    profile.password = '';

    res.status(200).send(profile);
  },

  async update(req, res) {
    if (req.headers['x-access-token'] === 'null' || req.headers['x-access-token'] === '') {
      res.status(401).send({
        message: 'Access token is not valid!'
      });
    }

    const decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT);

    if (!decoded) {
      res.status(401).send({
        message: 'Not authorized!'
      });
    }

    const updateProfileData = req.body

    delete updateProfileData.password;
    delete updateProfileData.token;
    delete updateProfileData.id;
    delete updateProfileData.role;

    const profile = await User.findByPk(decoded.uid, {
      include: [{
        model: Role
      }]
    });

    profile.update(updateProfileData);
    profile.password = '';

    res.status(200).send(profile);
  }
}
