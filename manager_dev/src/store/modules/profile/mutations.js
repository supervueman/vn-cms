const mutations = {
  set(state, payload) {
    state.profile = payload;
  },

  setRules(state, payload) {
    const rules = JSON.parse(payload);
    for (const rule in rules) {
      rules[rule] = rules[rule].value;
    }
    state.rules = rules;
  },

  setResources(state, payload) {
    state.resources = payload;
  }
};

export default mutations;
