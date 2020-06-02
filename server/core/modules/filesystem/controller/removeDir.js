const removeDir = require('../../../../handlers/removeDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_delete) {
    logger(
      'error',
      'filesystem',
      403,
      'removeDir.js',
      'Not rules "is_filesystem_directory_delete"'
    );
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await removeDir(req.body.path);

  res.status(200).send({
    message: 'OK'
  });
};
