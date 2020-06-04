import smsc from '../models/smsc.json';

const state = {
  smsc: {
    ...smsc
  },
  balance: 0,
  phones: []
};

export default state;
