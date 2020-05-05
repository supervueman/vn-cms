const Lexicon = require('../model');
const Lang = require('../../lang/model');

module.exports = async (lang, lexicons) => {
  const existLang = await Lang.findOne({
    where: {
      slug: lang
    },
    include: ['lexicons']
  });

  if (existLang && lexicons) {
    const newLexicons = lexicons.filter(
      (lexicon) =>
        !existLang.lexicons.find(
          (existLexicon) => lexicon.slug === existLexicon.slug
        )
    );

    if (newLexicons.length > 0) {
      newLexicons.forEach((el) => {
        el.langId = existLang.id;
      });

      await Lexicon.bulkCreate(newLexicons).catch((err) => {
        throw new Error(`${err}`);
      });
    }
  }
};
