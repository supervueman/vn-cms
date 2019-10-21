import role from '../models/role'
import rules from '../models/rules_default';

const state = {
  role: {
    ...role,
    rules
  },
  roles: [],
  count: 0
}

export default state;
