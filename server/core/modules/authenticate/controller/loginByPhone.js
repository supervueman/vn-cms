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
    sendRes({ res, status: 400 });
  });

  if (!user) {
    sendRes({ res, status: 404 });
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    logger('error', 'authenticate', 400, 'loginByPhone.js');
    sendRes({ res, status: 400 });
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

  sendRes({
    res,
    status: 200,
    data: {
      id: user.id,
      access_token
    }
  });
};
