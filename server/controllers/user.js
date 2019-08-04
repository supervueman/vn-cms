const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  async queryAll(req, res) {
    if (req.headers['x-access-token'] === 'null' || req.headers['x-access-token'] === '') {
      res.status(401).send({
        message: 'Access token is not valid!'
      });
    }
    const decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT);

    if (!decoded) {
      res.status(401).send({
        message: 'Not authorized!'
      });
    }

    const profile = await User.findByPk(decoded.uid);

    const filter = JSON.parse(req.query.filter);

    if (profile.role !== 'admin') {
      filter.where = {
        parentId: profile.id
      }
    }

    const users = await User.findAll(filter);

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
