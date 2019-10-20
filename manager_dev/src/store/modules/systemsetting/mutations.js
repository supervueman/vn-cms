const mutations = {
  setAll(state, payload) {
    state.systemSettings = payload.map(el => {
      el.setting = JSON.parse(el.setting);
      return el;
    });;
  },
  setCount(state, payload) {
    state.count = payload;
  }
};

export default mutations;
