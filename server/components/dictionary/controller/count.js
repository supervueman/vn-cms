const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || "{}");

  const count = await Model.count(filter);

  res.status(200).send({
    count
  });
}
