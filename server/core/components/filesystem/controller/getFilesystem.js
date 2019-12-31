const readDir = require('../../../../handlers/readDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_access) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  let filesystem = [];

  if (req.adminAccess) {
    filesystem = readDir('');
  } else {
    filesystem = readDir(req.context.slug);
  }

  res.status(200).send(filesystem);
};
