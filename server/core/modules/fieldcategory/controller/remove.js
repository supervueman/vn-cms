const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_category_delete) {
    logger('error', 'fieldcategory', 403, 'remove.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'fieldcategory', 400, 'remove.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    message: 'OK'
  });
};
