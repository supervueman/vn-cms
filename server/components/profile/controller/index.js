module.exports = {
  findByAccessToken: require('./findByAccessToken'),
  createByEmail: require('./createByEmail'),
  update: require('./update'),
  changePassword: require('./changePassword'),
  resetPasswordByEmailRequest: require('./resetPasswordByEmailRequest'),
  resetPasswordByEmail: require('./resetPasswordByEmail'),
  remove: require('./remove'),
  verifiedAccountByEmailRequest: require('./verifiedByEmailRequest'),
  verifiedAccountByEmail: require('./verifiedByEmail')
};
