import product from '../models/product';
import layout from '../../../layout/models/layout';

const state = {
  product: {
    ...product
  },
  layout: {
    ...layout
  },
  types: [],
  fields: [],
  additionalFields: [],
  serializedFields: {},
  products: [],
  count: 0,
  translations: []
};

export default state;
