import role from '../models/role'
import rules from '../models/rules_default';

const state = {
  role: {
    ...role,
    rules: {
      ...rules
    }
  },
  roles: [],
  defaultRules: {},
  count: 0
};

export default state;
