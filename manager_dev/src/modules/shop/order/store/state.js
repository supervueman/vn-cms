import order from '../models/order';

const state = {
  order: {
    ...order
  },
  orders: [],
  count: 0,
  couriers: [],
  managers: []
};

export default state;
