const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
  async create(req, res) {
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
}
