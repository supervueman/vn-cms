const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../../user/model');

module.exports = async (req, res) => {
  if (!(req.adminAccess || req.managerAccess)) {
    logger('error', 'profile', 403, 'createByPhone.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const existUser = await User.findOne({
    where: {
      phone: req.body.phone
    }
  });

  if (existUser) {
    logger('error', 'profile', 409, 'createByPhone.js');
    res.status(409).send({
      message: 'Conflict'
    });
    return;
  }

  if (!validator.isMobilePhone(req.body.phone, ['ru-RU', 'us-US'])) {
    logger('error', 'profile', 400, 'createByPhone.js');
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  if (
    validator.isEmpty(req.body.password) ||
    !validator.isLength(req.body.password, {
      min: 6
    })
  ) {
    logger('error', 'profile', 400, 'createByPhone.js');
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  if (
    validator.isEmpty(req.body.slug) ||
    !validator.isLength(req.body.slug, {
      min: 3
    })
  ) {
    logger('error', 'profile', 400, 'createByPhone.js');
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  const hashedPw = await bcrypt.hash(req.body.password, 12);

  const createdUser = await User.create({
    ...req.body,
    password: hashedPw,
    userId: req.profile.id
  });

  res.status(200).send(createdUser);
};
