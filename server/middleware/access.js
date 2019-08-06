const jwt = require('jsonwebtoken');

// Handlers
const accessHandler = require('../handlers/access');

module.exports = async (req, res, next) => {
  const decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT);

  if (!decoded) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;

  accessHandler(req, decoded.role.slug);

  next();
}
