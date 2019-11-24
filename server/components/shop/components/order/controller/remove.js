const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_order_update) {
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

  async function fetchRemoveItem() {
    await Model.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Success!'
    });
    return;
  }

  if (req.adminAccess) {
    await fetchRemoveItem();
  } else if (req.managerAccess && item.managerId === req.profile.id) {
    await fetchRemoveItem();
  } else if (!(req.adminAccess || req.managerAccess) && item.managerId === req.profile.userId) {
    await fetchRemoveItem();
  } else if (item.ownerId === req.profile.id) {
    await fetchRemoveItem();
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
  }
};
