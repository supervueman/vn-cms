const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  }).catch((err) => {
    logger('error', 'authenticate', 400, 'loginByEmail.js', err);
    sendRes({ res, status: 400 });
  });

  if (!user) {
    logger('error', 'authenticate', 404, 'loginByEmail.js');
    sendRes({ res, status: 404 });
  }

  // Сравниваем пароли
  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    logger('error', 'authenticate', 400, 'loginByEmail.js');
    sendRes({ res, status: 400 });
  }

  const access_token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.SECRET_KEY_FOR_JWT,
    {
      expiresIn: '360h'
    }
  );

  sendRes({
    res,
    status: 200,
    data: {
      id: user.id,
      access_token
    }
  });
};
