// Models
const Model = require('../model');

module.exports = async () => {
  let is_id_in_slug = await Model.findOne({
    where: {
      slug: 'is_id_in_slug'
    }
  });

  if (!is_id_in_slug) {
    is_id_in_slug = await Model.create({
      slug: 'is_id_in_slug',
      title: 'Use resource id in aliases',
      setting: '{"value": "false"}',
      component: 'base',
      settingType: 'switcher'
    });
  }

  let main_lang = await Model.findOne({
    where: {
      slug: 'main_lang'
    }
  });

  if (!main_lang) {
    main_lang = await Model.create({
      slug: 'main_lang',
      title: 'Base lang',
      setting: '{"value": "ru"}',
      component: 'base',
      settingType: 'text'
    });
  }
};
