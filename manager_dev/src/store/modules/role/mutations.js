const mutations = {
  set(state, payload) {
    let role = payload;
    if (typeof payload.rules === 'string')
      role = {
        ...payload,
        rules: {
          ...JSON.parse(payload.rules)
        }
      };
    state.role = role;
  },
  setAll(state, payload) {
    state.roles = payload;
  },
  setCount(state, payload) {
    state.count = payload;
  }
};

export default mutations;
