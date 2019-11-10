const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
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

  const reqUser = req.body;
  delete reqUser.id;
  delete reqUser.password;
  delete reqUser.token;

  if ((req.managerAccess && String(item.userId) === String(req.profile.id)) || (!req.managerAccess && String(item.userId) === String(req.profile.userId)) || req.adminAccess) {
    const updatedItem = await item.update(reqUser);

    const filter = JSON.parse(req.query.filter || "{}");

    const newItem = await Model.findByPk(updatedItem.id, filter);

    res.status(200).send(newItem);
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }
}
