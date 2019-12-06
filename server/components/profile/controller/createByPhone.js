const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../../user/model');

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

  if (!validator.isMobilePhone(req.body.phone, ['ru-RU', 'us-US'])) {
    res.status(401).send({
      message: 'Phone is invalid!'
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

  const createdUser = await User.create({
    ...req.body,
    password: hashedPw,
    userId: req.profile.id
  });

  await createDir(`../files/${createdUser.id}`);

  res.status(200).send(createdUser);
};
