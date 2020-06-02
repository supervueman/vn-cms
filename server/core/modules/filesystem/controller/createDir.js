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
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await createDir(req.body.path);

  res.status(200).send({
    message: 'OK'
  });
};
