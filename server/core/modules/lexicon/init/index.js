// Data
const ruLexicons = require('../data/ru.json');
const enLexicons = require('../data/en.json');
const plLexicons = require('../data/pl.json');

// Helpers
const createLexicons = require('../helpers/createLexicons');

module.exports = async () => {
  await createLexicons('ru', ruLexicons);
  await createLexicons('en', enLexicons);
  await createLexicons('pl', plLexicons);
};
