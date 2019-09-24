// Models
const SystemSetting = require('../../models/systemSetting');

module.exports = async () => {
  let is_id_in_slug = await SystemSetting.findOne({
    where: {
      slug: 'is_id_in_slug'
    }
  });

  if (!is_id_in_slug) {
    is_id_in_slug = await SystemSetting.create({
      slug: 'is_id_in_slug',
      title: 'Использовать id ресурсов в псевдонимах',
      value: 'false',
      component: 'base',
      settingType: 'switcher'
    });
  }

  let main_lang = await SystemSetting.findOne({
    where: {
      slug: 'main_lang'
    }
  });

  if (!main_lang) {
    main_lang = await SystemSetting.create({
      slug: 'main_lang',
      title: 'Основной язык',
      value: 'en',
      component: 'base',
      settingType: 'text'
    });
  }
}
