const {
  cors_access_url,
  header_authorization
} = require('../core.config');

module.exports = (req, res, next) => {
  const allowedOrigins = cors_access_url.split(', ');
  const origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, x-api-key, x-reset-token');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  if (req.url.indexOf('files') <= 0) {
    if (req.headers.authorization === header_authorization) {
      next();
    } else {
      res.status(401).send({
        message: 'Not authorization!'
      });
    }
  } else {
    next();
  }
};
