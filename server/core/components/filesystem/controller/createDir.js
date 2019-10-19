const createDir = require('../../../../handlers/createDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  await createDir(req.body.path);

  res.status(200).send({
    message: 'Success!'
  });
}
