import profile from '@/models/user';
import rules from '@/models/rules_default';

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
