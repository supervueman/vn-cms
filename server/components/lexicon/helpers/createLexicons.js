const Lexicon = require('../model');
const Lang = require('../../lang/model');

module.exports = async (lang, lexicons) => {
  const existLang = await Lang.findOne({
    where: {
      slug: lang
    },
    include: [{ association: 'lexicons' }]
  });

  if (existLang) {
    console.log(existLang);
  }
};
