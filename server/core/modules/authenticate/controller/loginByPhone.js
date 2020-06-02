const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const user = await User.findOne({
    where: {
      phone: req.body.phone
    }
  }).catch((err) => {
    logger('error', 'authenticate', 400, 'loginByPhone.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!user) {
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    logger('error', 'authenticate', 400, 'loginByPhone.js');
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  const access_token = jwt.sign(
    {
      id: user.id,
      phone: user.phone
    },
    process.env.SECRET_KEY_FOR_JWT,
    {
      expiresIn: '360h'
    }
  );

  res.status(200).send({
    id: user.id,
    access_token
  });
};
