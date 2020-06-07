const removeDir = require('../handlers/removeDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_delete) {
    logger(
      'error',
      'filesystem',
      403,
      'removeDir.js',
      'Not rules "is_filesystem_directory_delete"'
    );
    sendRes({ res, status: 403 });
  }

  await removeDir(req.body.path);

  sendRes({ res, status: 200 });
};
