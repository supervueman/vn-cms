const Model = require('../model');
const SystemSetting = require('../../systemsetting/model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_create && !req.context) {
    logger('error', 'resource', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  if (req.context.slug === 'root' && !req.body.contextId) {
    logger('error', 'resource', 400, 'create.js', 'Not contextId');
    sendRes({ res, status: 400 });
  }

  let createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'resource', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  const is_id_in_slug = await SystemSetting.findOne({
    where: {
      slug: 'is_id_in_slug'
    }
  }).catch((err) => {
    logger('error', 'resource', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  if (JSON.parse(is_id_in_slug.setting).value) {
    createdItem.slug = `${req.body.slug}-${createdItem.id}`;

    createdItem = await createdItem
      .update({
        slug: createdItem.slug
      })
      .catch((err) => {
        logger('error', 'resource', 400, 'create.js', err);
        sendRes({ res, status: 400 });
      });
  }

  sendRes({ res, status: 200, data: createdItem });
};
