const dirTree = require("directory-tree");

// Models
const Dictionary = require('../../models/dictionary');


module.exports = async () => {
  const dictionaries = dirTree('./components/dictionary/dictionaries', {
    normalizePath: true
  });

  for await (let dictionary of dictionaries.children) {
    const requireDictionary = require(`./dictionaries/${dictionary.name}`);

    const existDictionary = await Dictionary.findOne({
      where: {
        lang: requireDictionary.lang
      }
    });

    if (!existDictionary) {
      await Dictionary.create({
        ...requireDictionary,
        value: JSON.stringify(requireDictionary.value)
      });
    }
  }
}
