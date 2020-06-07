module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_rename) {
    logger(
      'error',
      'filesystem',
      403,
      'renameDir.js',
      'Not rules "is_filesystem_directory_rename"'
    );
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200 });
};
