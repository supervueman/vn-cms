module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_files_create) {
    logger(
      'error',
      'filesystem',
      403,
      'createFile.js',
      'Not rules "is_filesystem_files_create"'
    );
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200 });
};
