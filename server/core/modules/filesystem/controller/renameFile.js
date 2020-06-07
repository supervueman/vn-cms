module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_files_rename) {
    logger(
      'error',
      'filesystem',
      403,
      'renameFile.js',
      'Not rules "is_filesystem_files_rename"'
    );
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200 });
};
