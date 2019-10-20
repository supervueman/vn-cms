const mutations = {
  set(state, payload) {
    state.dictionary = {
      ...payload,
      value: typeof payload.value === 'object' ? payload.value : JSON.parse(payload.value)
    };
  },
  setAll(state, payload) {
    state.dictionaries = payload.map(el => {
      el.value = typeof el.value === 'object' ? el.value : JSON.parse(el.value);
      return el;
    });
  },
  pushToAll(state, payload) {
    const dictionary = {
      ...payload,
      value: typeof payload.value === 'object' ? payload.value : JSON.parse(payload.value)
    };
    state.dictionaries.push(dictionary);
  },
  setCount(state, payload) {
    state.count = payload;
  },
};

export default mutations;
