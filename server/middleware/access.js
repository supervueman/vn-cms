const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (req.headers['x-access-token'] === 'null' || req.headers['x-access-token'] === '') {
    req.isAuth = false;
    return next();
  }

  const decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT);

  if (!decoded) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  if (decoded.role.slug === 'admin') {
    req.adminAccess = true;
  } else if (decoded.role.slug === 'manager') {
    req.managerAccess = true;
  } else if (decoded.role.slug === 'courier') {
    req.courierAccess = true;
  } else if (decoded.role.slug === 'user') {
    req.userAccess = true;
  } else {
    req.otherAccess = true;
  }

  // console.log('adminAccess', req.adminAccess)
  // console.log('managerAccess', req.managerAccess)
  // console.log('courierAccess', req.courierAccess)
  // console.log('userAccess', req.userAccess)
  // console.log('otherAccess', req.otherAccess)
  // console.log('isAuth', req.isAuth)

  next();
}
