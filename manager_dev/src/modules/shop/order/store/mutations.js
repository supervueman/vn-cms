const mutations = {
  SET(state, payload) {
    state.order.products = [];
    // console.log(payload)
    if (payload.products && payload.products.length > 0) {
      payload.products.forEach(el => {
        const fields = {};
        if (el.additionalfields && el.additionalfields.length > 0) {
          el.additionalfields.forEach(field => {
            fields[field.slug] = field.value;
          });
        }
        el.fields = fields;
      });
    }

    state.order = payload;
  },
  SET_ALL(state, payload) {
    state.orders = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.orders.push(payload);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
};

export default mutations;
