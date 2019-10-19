const Model = require('../model');
const SystemSetting = require('../../systemsetting/model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  req.body.userId = req.profile.id;
  if (!req.managerAccess && !req.adminAccess) {
    req.body.userId = req.profile.userId;
  }

  let createdItem = await Model.create(req.body);

  const is_id_in_slug = await SystemSetting.findOne({
    where: {
      slug: 'is_id_in_slug'
    }
  });

  if (JSON.parse(is_id_in_slug.setting).value) {
    createdItem.slug = `${req.body.slug}-${createdItem.id}`;

    createdItem = await createdItem.update({
      slug: createdItem.slug
    });
  }

  const main_lang = await SystemSetting.findOne({
    where: {
      slug: 'main_lang'
    }
  });

  if (!main_lang) {
    res.status(404).send({
      message: 'Not found!'
    });
  }

  if (JSON.parse(main_lang.dataValues.setting).value === createdItem.lang) {
    createdItem = await createdItem.update({
      translationId: createdItem.dataValues.id
    });
  }

  res.status(200).send(createdItem);
}
