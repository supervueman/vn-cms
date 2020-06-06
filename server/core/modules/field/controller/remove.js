const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_delete) {
    logger('error', 'field', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'field', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
