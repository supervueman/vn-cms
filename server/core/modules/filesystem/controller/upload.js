module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_files_uploads) {
    logger(
      'error',
      'filesystem',
      403,
      'upload.js',
      'Not rules "is_filesystem_files_uploads"'
    );
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200 });
};
