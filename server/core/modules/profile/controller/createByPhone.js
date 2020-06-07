const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../../user/model');

// Validators
const phoneValidator = require('../../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!(req.adminAccess || req.managerAccess)) {
    logger('error', 'profile', 403, 'createByPhone.js');
    sendRes({ res, status: 403 });
  }

  const existUser = await User.findOne({
    where: {
      phone: req.body.phone
    }
  });

  if (existUser) {
    logger('error', 'profile', 409, 'createByPhone.js');
    sendRes({ res, status: 409 });
  }

  if (!validator.isMobilePhone(req.body.phone, ['ru-RU', 'us-US'])) {
    logger('error', 'profile', 400, 'createByPhone.js');
    sendRes({ res, status: 400 });
  }

  if (
    validator.isEmpty(req.body.password) ||
    !validator.isLength(req.body.password, {
      min: 6
    })
  ) {
    logger('error', 'profile', 400, 'createByPhone.js');
    sendRes({ res, status: 400 });
  }

  if (
    validator.isEmpty(req.body.slug) ||
    !validator.isLength(req.body.slug, {
      min: 3
    })
  ) {
    logger('error', 'profile', 400, 'createByPhone.js');
    sendRes({ res, status: 400 });
  }

  const hashedPw = await bcrypt.hash(req.body.password, 12);

  const phone = phoneValidator(req.body.phone);

  if (phone) {
    req.body.phone = phone;
  }

  const createdUser = await User.create({
    ...req.body,
    password: hashedPw,
    userId: req.profile.id
  });

  sendRes({ res, status: 200, data: createdUser });
};
