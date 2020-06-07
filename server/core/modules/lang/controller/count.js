const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || '{}');

  const count = await Model.count(filter).catch((err) => {
    logger('error', 'lang', 400, 'count.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: { count } });
};
