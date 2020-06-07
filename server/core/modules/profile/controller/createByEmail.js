const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../../user/model');
const Role = require('../../role/model');

// Validators
const phoneValidator = require('../../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!req.rules.is_user_create) {
    logger('error', 'profile', 403, 'createByEmail.js');
    sendRes({ res, status: 403 });
  }

  // Проверяем не существует ли уже такой пользователь
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (user) {
    logger('error', 'profile', 409, 'createByEmail.js');
    sendRes({ res, status: 409 });
  }

  // назначить default роль
  const defaultRole = await Role.findOne({
    where: {
      slug: 'default'
    }
  }).catch((err) => {
    logger('error', 'profile', 400, 'createByEmail.js', err);
    sendRes({ res, status: 400 });
  });
  req.body.roleId = defaultRole.id;

  // Если контекст не валидный или не назначен то присвоить контекст пользователя
  if (typeof req.body.contextId !== 'number' && !!req.body.contextId) {
    req.body.contextId = req.context.id;
  }

  if (!validator.isEmail(req.body.email)) {
    logger('error', 'profile', 400, 'createByEmail.js');
    sendRes({ res, status: 400 });
  }

  if (
    validator.isEmpty(req.body.password) ||
    !validator.isLength(req.body.password, {
      min: 6
    })
  ) {
    logger('error', 'profile', 400, 'createByEmail.js');
    sendRes({ res, status: 400 });
  }

  const hashedPw = await bcrypt.hash(req.body.password, 12);

  const phone = phoneValidator(req.body.phone);

  if (phone) {
    req.body.phone = phone;
  }

  const userCreated = {
    ...req.body,
    verified: false,
    password: hashedPw
  };

  const createdUser = await User.create(userCreated).catch((err) => {
    logger('error', 'profile', 400, 'createByEmail.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdUser });
};
