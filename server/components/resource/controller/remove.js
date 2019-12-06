const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_delete) {
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
  }

  // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
  if (((req.managerAccess && item.userId === req.profile.id) || req.adminAccess) || item.userId === req.profile.userId) {
    await Model.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Success!'
    });
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }
};
