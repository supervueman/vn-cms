const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_delete) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id);

  if (item.slug === 'admin' || item.slug === 'manager') {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.body.id
    }
  });

  res.status(200).send({
    message: 'Success remove!'
  });
};
