const Model = require('../model');

module.exports = async (req, res) => {
  // if (!req.rules.is_roles_read) {
  //   res.status(403).send({
  //     message: 'Access denied!'
  //   });
  //   return;
  // }

  const filter = JSON.parse(req.query.filter || "{}");

  const items = await Model.findAll(filter);

  res.status(200).send(items);
}
