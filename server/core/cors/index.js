const { cors_access_url, header_authorization } = require('../core.config');

module.exports = (req, res, next) => {
  const origin = req.headers.origin;

  if (cors_access_url.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    return res.sendStatus(403);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-access-token, x-api-key, x-reset-token, x-verified-token'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  if (req.url.includes('files')) {
    if (req.headers.authorization === header_authorization) {
      next();
    } else {
      logger('error', 'cors', 401, 'index.js', 'Authorization is not valid');
      
      sendRes({ res, status: 401 });
    }
  } else {
    next();
  }
};
