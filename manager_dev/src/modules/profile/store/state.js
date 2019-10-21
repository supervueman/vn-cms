import profile from '../../user/models/user';
import rules from '../../role/models/rules_default';

const rulesParse = {
  ...rules
};
for (const rule in rulesParse) {
  rulesParse[rule] = rulesParse[rule].value;
}

const state = {
  profile: {
    ...profile
  },
  resources: [],
  rules: {
    ...rulesParse
  }
};

export default state;
