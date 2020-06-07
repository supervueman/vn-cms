const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_lang_create) {
    logger('error', 'lang', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  const existItem = await Model.findOne({
    where: {
      slug: req.body.slug
    }
  }).catch((err) => {
    logger('error', 'lang', 403, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  if (existItem) {
    logger('error', 'lang', 409, 'create.js');
    sendRes({ res, status: 409 });
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'lang', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};
