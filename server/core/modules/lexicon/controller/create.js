const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_lexicon_create) {
    logger('error', 'lexicon', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  const existItem = await Model.findOne({
    where: {
      slug: req.body.slug
    }
  }).catch((err) => {
    logger('error', 'lexicon', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  if (existItem) {
    logger('error', 'lexicon', 409, 'create.js');
    sendRes({ res, status: 409 });
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'lexicon', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};
