const Model = require('../model');
const SystemSetting = require('../../systemsetting/model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_create && !req.context) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  let createdItem = await Model.create(req.body).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  const is_id_in_slug = await SystemSetting.findOne({
    where: {
      slug: 'is_id_in_slug'
    }
  });

  if (JSON.parse(is_id_in_slug.setting).value) {
    createdItem.slug = `${req.body.slug}-${createdItem.id}`;

    createdItem = await createdItem.update({
      slug: createdItem.slug
    }).catch(err => {
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  res.status(200).send(createdItem);
};
