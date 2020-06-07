const removeFile = require('../handlers/removeFile');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_files_delete) {
    logger(
      'error',
      'filesystem',
      403,
      'removeFile.js',
      'Not rules "is_filesystem_files_delete"'
    );
    sendRes({ res, status: 403 });
  }

  await removeFile(req.body.path);

  sendRes({ res, status: 200 });
};
