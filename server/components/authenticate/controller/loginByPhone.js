const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../user/model');

module.exports = async (req, res) => {
  const user = await User.findOne({
    where: {
      phone: req.body.phone
    },
    include: ['role']
  });

  if (!user) {
    res.status(404).send({
      message: 'User not found!'
    });
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    res.status(401).send({
      message: 'Password is not correct!'
    });
  }

  const access_token = jwt.sign({
    uid: user.id.toString(),
    email: user.email,
    role: user.role
  }, process.env.SECRET_KEY_FOR_JWT, {
    expiresIn: '360h'
  });

  res.status(200).send({
    uid: user.id,
    access_token
  });
}
