const Model = require('../model');
const ResourceType = require('../../../models/resourceType');

module.exports = async (req, res) => {
  if (!req.rules.is_resources_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const types = await ResourceType.findAll();

  res.status(200).send(types);
}
