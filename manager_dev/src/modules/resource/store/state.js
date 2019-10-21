import resource from '@/models/resource';
import layout from '@/models/layout';

const state = {
  resource: {
    ...resource
  },
  layout: {
    ...layout
  },
  types: [],
  fields: [],
  additionalFields: [],
  serializedFields: {},
  resources: [],
  count: 0,
  translations: []
};

export default state;
