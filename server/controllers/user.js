const User = require('../models/user');

module.exports = {
  async queryAll(req, res) {
    const users = await User.findAll({
      ...JSON.parse(req.query.filter)
    });
    users.forEach(el => {
      el.password = '';
      el.token = '';
    });
    const count = await User.count();
    res.send({
      users,
      count
    });
  }
}
