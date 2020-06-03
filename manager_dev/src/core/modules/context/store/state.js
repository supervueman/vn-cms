import context from '../models/context';

const state = {
  context: {
    ...context
  },
  contexts: [],
  count: 0,
  sidebarContexts: []
};

export default state;
