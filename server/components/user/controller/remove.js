const Model = require('../model');

// Helpers
const removeDir = require('../../../handlers/removeDir');

module.exports = async (req, res) => {
  if (!req.rules.is_user_delete) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  if ((req.managerAccess && String(item.userId) === String(req.profile.id)) || (!req.managerAccess && String(item.userId) === String(req.profile.userId)) || req.adminAccess) {
    removeDir(`../files/${item.id}`);
    await item.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200).send({
      message: 'Success!'
    });
  } else {
    res.status(404).send({
      message: 'Not found!'
    });
  }
};
