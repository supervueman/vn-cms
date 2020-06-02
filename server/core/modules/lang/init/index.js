// Models
const Model = require('../model');

// Data
const langs = require('../data/langs.json');

module.exports = async () => {
  for await (let item of langs) {
    const existItem = await Model.findOne({
      where: {
        slug: item.slug
      }
    });

    if (!existItem) {
      await Model.create({
        ...item
      });
    }
  }
};
