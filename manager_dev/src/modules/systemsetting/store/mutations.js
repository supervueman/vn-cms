const mutations = {
  SET_ALL(state, payload) {
    state.systemSettings = payload.map(el => {
      el.setting = JSON.parse(el.setting);
      return el;
    });;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
