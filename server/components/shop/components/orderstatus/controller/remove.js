const Model = require('../model');

module.exports = async (req, res) => {
  // if (!req.rules.is_roles_delete) {
  //   res.status(403).send({
  //     message: 'Access denied!'
  //   });
  //   return;
  // }

  await Model.destroy({
    where: {
      id: req.body.id
    }
  });

  res.status(200).send({
    message: 'Success remove!'
  });
};
