const mutations = {
  SET(state, payload) {
    state.profile = payload;
  },

  SET_RULES(state, payload) {
    const rules = JSON.parse(payload);
    for (const rule in rules) {
      rules[rule] = rules[rule].value;
    }
    state.rules = rules;
  }
};

export default mutations;
