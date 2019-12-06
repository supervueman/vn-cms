const bcrypt = require('bcrypt');
const validator = require('validator');

const generatePassword = require('password-generator');

const User = require('../../user/model');

const smsc = require('../helpers/smsc_api.js');

const createDir = require('../../../handlers/createDir');

module.exports = async (req, res) => {
  if (!(req.adminAccess || req.managerAccess)) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
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
    return;
  }
  // 7##########
  if (!validator.isMobilePhone(req.body.phone, ['ru-RU', 'us-US'])) {
    res.status(401).send({
      message: 'Phone is invalid!'
    });
    return;
  }

  const genPass = generatePassword(6, false);

  smsc.configure({
    login: process.env.SMSC_LOGIN,
    password: process.env.SMSC_PASSWORD,
    // ssl: false,
    charset: 'utf-8',
  });

  await smsc.send_sms({
      list: {
        [req.body.phone]: `Ваш пароль: ${genPass}`
      }
    },
    (data, raw, err, code) => {
      if (err) {
        res.status(500).send({
          message: 'Failed'
        });
        return console.log(err, 'code: ' + code);
      }
    });

  const hashedPw = await bcrypt.hash(genPass, 12);

  const createdUser = await User.create({
    ...req.body,
    password: hashedPw,
    userId: req.profile.id,
    verified: false
  });

  if (req.adminAccess) {
    await createDir(`../files/user-${createdUser.id}`);
  } else if (req.managerAccess) {
    await createDir(`../files/user-${req.profile.id}/user-${createdUser.id}`);
  } else {
    if (req.profile.userId) {
      await createDir(`../files/user-${req.profile.userId}/user-${createdUser.id}`);
    } else {
      await createDir(`../files/user-${createdUser.id}`);
    }
  }

  res.status(200).send(createdUser);
};
