import dictionary from '../models/dictionary.json';

const state = {
  dictionary: {
    ...dictionary
  },
  dictionaries: [],
  count: 0
};

export default state;
