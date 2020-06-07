const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_read) {
    logger('error', 'user', 403, 'count.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  if (!filter.where) {
    filter.where = {};
  }

  // Если запрос от админа то вернуть всех а если нет то вернуть только если совпадают контексты
  if (!req.adminAccess) {
    filter.where.contextId = req.context.id;
  }

  const count = await Model.count(filter).catch((err) => {
    logger('error', 'user', 400, 'count.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: { count } });
};
