import lexicon from '../models/lexicon.json';

const state = {
  lexicon: {
    ...lexicon
  },
  lexicons: [],
  count: 0
};

export default state;
