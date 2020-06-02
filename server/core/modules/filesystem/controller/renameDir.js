module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_rename) {
    logger(
      'error',
      'filesystem',
      403,
      'renameDir.js',
      'Not rules "is_filesystem_directory_rename"'
    );
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200).send({
    message: 'OK'
  });
};
