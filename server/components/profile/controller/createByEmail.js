const bcrypt = require('bcrypt');
const validator = require('validator');

const createDir = require('../../../handlers/createDir');

const User = require('../../user/model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
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
    return;
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(401).send({
      message: 'E-mail is invalid!'
    });
    return;
  }

  if (validator.isEmpty(req.body.password) || !validator.isLength(req.body.password, {
      min: 6
    })) {
    res.status(401).send({
      message: 'Password is short!'
    });
    return;
  }

  if (validator.isEmpty(req.body.slug) || !validator.isLength(req.body.slug, {
      min: 3
    })) {
    res.status(401).send({
      message: 'Slug is short!'
    });
    return;
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

  if (req.adminAccess) {
    await createDir(`../files/user-${createdUser.id}`);
  } else if (req.managerAccess) {
    await createDir(`../files/user-${req.profile.id}/user-${createdUser.id}`);
  } else {
    await createDir(`../files/user-${req.profile.userId}/user-${createdUser.id}`);
  }

  res.status(200).send(createdUser);
}
