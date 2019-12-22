const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_system_setting_update) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }
  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};
