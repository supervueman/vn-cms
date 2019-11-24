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

  const updateItem = req.body;
  delete updateItem.id;

  async function fetchUpdateItem() {
    const updatedItem = await item.update(updateItem);
    res.status(200).send(updatedItem);
  }

  if (req.adminAccess) {
    await fetchUpdateItem();
  } else if (req.managerAccess && item.managerId === req.profile.id) {
    await fetchUpdateItem();
  } else if (!(req.adminAccess || req.managerAccess) && item.managerId === req.profile.userId) {
    await fetchUpdateItem();
  } else if (item.ownerId === req.profile.id) {
    await fetchUpdateItem();
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
  }
};
