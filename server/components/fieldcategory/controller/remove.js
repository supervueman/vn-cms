const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_category_delete) {
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

  await Model.destroy({
    where: {
      id: req.body.id
    }
  });
  res.status(200).send({
    message: 'Success!'
  });
};
