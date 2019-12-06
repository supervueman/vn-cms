const Model = require('../model');

module.exports = async (req, res) => {
  if (!(req.adminAccess || req.managerAccess)) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  for (let field of req.body.fields) {
    const item = await Model.findByPk(field.id);

    if (!item) {
      res.status(404).send({
        message: 'Nor found!'
      });
      return;
    }

    await item.update(field);
  }

  res.status(200).send({
    message: 'Success!'
  });
};
