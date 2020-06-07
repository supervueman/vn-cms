const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_lexicon_delete) {
    logger('error', 'lexicon', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'lexicon', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'lexicon', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'lexicon', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
