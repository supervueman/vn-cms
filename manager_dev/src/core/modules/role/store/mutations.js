const mutations = {
  SET(state, payload) {
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
  SET_ALL(state, payload) {
    state.roles = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_DEFAULT_ROLE(state, payload) {
    state.defaultRole = payload;
  }
};

export default mutations;
