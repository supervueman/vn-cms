const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_category_delete) {
    logger('error', 'fieldcategory', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'fieldcategory', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200 });
};
