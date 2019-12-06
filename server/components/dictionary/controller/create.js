const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_dictionary_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const existItem = await Model.findOne({
    where: {
      lang: req.body.lang
    }
  });

  if (existItem) {
    res.status(401).send({
      message: 'Is exist!'
    });
  }

  const createdItem = await Model.create(req.body);

  res.status(200).send(createdItem);
};
