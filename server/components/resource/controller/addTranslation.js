const Model = require('../model');

module.exports = async (req, res) => {
  console.log(req.body)
  if (!req.rules.is_resource_create) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  for await (let arr of req.body) {
    const item = await Model.findByPk(arr[0]).catch(err => {
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });

    if (!item) {
      res.status(404).send({
        message: 'Not found'
      });
    }

    await item.addTranslation(arr[1]).catch(err => {
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  res.status(200).send({
    message: 'OK'
  });
};
