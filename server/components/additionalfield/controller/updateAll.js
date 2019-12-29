const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  for (let field of req.body.fields) {
    const item = await Model.findByPk(field.id).catch(err => {
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });

    if (!item) {
      res.status(404).send({
        message: 'Not found'
      });
      return;
    }

    await item.update(field).catch(err => {
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  res.status(200).send({
    message: 'Success!'
  });
};
