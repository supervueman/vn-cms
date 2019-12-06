const readDir = require('../../../../handlers/readDir');

module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_access) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  let filesystem = [];

  if (req.adminAccess) {
    filesystem = readDir('');
  } else if (req.managerAccess) {
    filesystem = readDir(`user-${req.profile.id}`);
  } else {
    filesystem = readDir(`user-${req.profile.userId}/user-${req.profile.id}`);
  }

  res.status(200).send(filesystem);
};
