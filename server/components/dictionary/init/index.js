const dirTree = require("directory-tree");

// Models
const Model = require('../model');

module.exports = async () => {
  const items = dirTree('./components/dictionary/data', {
    normalizePath: true
  });

  for await (let item of items.children) {
    const requireItem = require(`../data/${item.name}`);

    const existItem = await Model.findOne({
      where: {
        lang: requireItem.lang
      }
    });

    if (!existItem) {
      await Model.create({
        ...requireItem,
        value: JSON.stringify(requireItem.value)
      });
    }
  }
};
