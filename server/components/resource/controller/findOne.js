const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resources_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  const item = await Model.findOne(filter);

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
}
