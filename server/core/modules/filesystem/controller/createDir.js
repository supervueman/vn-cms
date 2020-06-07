const createDir = require('../handlers/createDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_create) {
    logger(
      'error',
      'filesystem',
      403,
      'createDir.js',
      'Not rules "is_filesystem_directory_create"'
    );
    sendRes({ res, status: 403 });
  }

  await createDir(req.body.path);

  sendRes({ res, status: 200 });
};
