const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_tag_delete && req.context.slug !== 'root') {
    logger('error', 'tag', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'tag', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
