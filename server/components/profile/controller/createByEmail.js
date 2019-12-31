const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../../user/model');
const Role = require('../../role/model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_create) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  // Проверяем не существует ли уже такой пользователь
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (user) {
    res.status(409).send({
      message: 'Conflict'
    });
    return;
  }

  const role = await Role.findByPk(req.body.roleId).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  // Если роль не передана или не найдена то назначить default роль
  if (!role) {
    const defaultRole = await Role.findOne({
      where: {
        slug: 'default'
      }
    });
    req.body.roleId = defaultRole.id;
  }

  // Если роль найдена и присваиваемая роль по рангу выше чем ранг роли пользователя то запретить
  if (role && role.rang > req.rang) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  // Если контекст не валидный или не назначен то присвоить контекст пользователя
  if (typeof req.body.contextId !== 'number' && !!req.body.contextId) {
    req.body.contextId = req.context.id;
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  if (validator.isEmpty(req.body.password) || !validator.isLength(req.body.password, {
      min: 6
    })) {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  const hashedPw = await bcrypt.hash(req.body.password, 12);

  const userCreated = {
    ...req.body,
    password: hashedPw
  };

  const createdUser = await User.create(userCreated).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(createdUser);
};
