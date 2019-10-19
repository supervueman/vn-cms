const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || "{}");

  const items = await Model.findAll(filter);

  res.status(200).send(items);
}
