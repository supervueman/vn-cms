const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'lexicon', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'lexicon', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};
