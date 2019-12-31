const removeFile = require('../../../../handlers/removeFile');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_files_delete) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await removeFile(req.body.path);

  res.status(200).send({
    message: 'OK'
  });
};
