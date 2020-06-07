const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_update) {
    logger('error', 'resource', 403, 'removeTag.js');
    sendRes({ res, status: 403 });
  }

  for await (let arr of req.body) {
    const item = await Model.findByPk(arr[0]).catch((err) => {
      logger('error', 'resource', 400, 'removeTag.js', err);
      sendRes({ res, status: 400 });
    });

    if (!item) {
      logger('error', 'resource', 404, 'removeTag.js');
      sendRes({ res, status: 404 });
    }

    await item.removeTag(arr[1]).catch((err) => {
      logger('error', 'resource', 400, 'removeTag.js', err);
      sendRes({ res, status: 400 });
    });
  }

  sendRes({ res, status: 200 });
};
