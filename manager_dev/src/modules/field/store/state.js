import field from '@/models/field';

const state = {
  field: {
    ...field
  },
  fields: [],
  count: 0,
  layouts: [],
  types: ['text', 'textarea', 'editor', 'image', 'select', 'multiselect', 'migx', 'radio', 'date', 'time', 'colorpicker', 'checkbox']
};

export default state;
