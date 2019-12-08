const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const id = req.params.id;

  const filter = JSON.parse(req.query.filter || "{}");

  const item = await Model.findByPk(id, filter);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
  if (((req.managerAccess && item.userId === req.profile.id) || req.adminAccess) || item.userId === req.profile.userId) {
    res.status(200).send(item);
  } else {
    res.status(403).send({
      mesasge: 'Access denied!'
    });
    return;
  }
};
