const mutations = {
  SET(state, payload) {
    state.dictionary = {
      ...payload,
      value: typeof payload.value === 'object' ? payload.value : JSON.parse(payload.value)
    };
  },
  SET_ALL(state, payload) {
    state.dictionaries = payload.map(el => {
      el.value = typeof el.value === 'object' ? el.value : JSON.parse(el.value);
      return el;
    });
  },
  PUSH_TO_ALL(state, payload) {
    const dictionary = {
      ...payload,
      value: typeof payload.value === 'object' ? payload.value : JSON.parse(payload.value)
    };
    state.dictionaries.push(dictionary);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
};

export default mutations;
