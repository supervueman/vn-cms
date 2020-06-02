const Model = require('../model');

module.exports = async () => {
  const defaultLayout = await Model.findOne({
    where: {
      slug: 'default'
    }
  });

  if (!defaultLayout) {
    await Model.create({
      slug: 'default',
      title: 'Base'
    });
  }
};
