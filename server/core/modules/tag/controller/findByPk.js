const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_tag_read) {
    logger('error', 'tag', 403, 'findByPk.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'tag', 400, 'findByPk.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'tag', 404, 'findByPk.js');
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};
