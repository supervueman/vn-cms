const Model = require('../model');
const SystemSetting = require('../../systemsetting/model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_update) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  const item = await Model.findByPk(req.body.id, filter);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
  if (((req.managerAccess && item.userId === req.profile.id) || req.adminAccess) || item.userId === req.profile.userId) {
    const updateItem = req.body;

    const is_id_in_slug = await SystemSetting.findOne({
      where: {
        slug: 'is_id_in_slug'
      }
    });

    if (JSON.parse(is_id_in_slug.setting).value) {
      const slugId = updateItem.slug.substring(updateItem.slug.length - `${updateItem.id}`.length);

      if (`-${slugId}` !== `-${updateItem.id}`) {
        updateItem.slug = `${req.body.slug}-${updateItem.id}`;
      }
    }

    const updatedItem = await item.update(updateItem);

    res.status(200).send(updatedItem);
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }
}
