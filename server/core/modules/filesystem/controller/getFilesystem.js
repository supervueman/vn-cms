const readDir = require('../handlers/readDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_access) {
    logger(
      'error',
      'filesystem',
      403,
      'getFilesystem.js',
      'Not rules "is_filesystem_access"'
    );
    sendRes({ res, status: 403 });
  }

  let filesystem = [];

  if (req.adminAccess) {
    filesystem = readDir('');
  } else {
    filesystem = readDir(req.context.slug);
  }

  sendRes({ res, status: 200, data: filesystem });
};
