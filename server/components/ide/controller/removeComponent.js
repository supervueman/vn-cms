const fs = require('fs');

module.exports = async (req, res) => {
  if (!req.adminAccess) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  fs.unlinkSync(`../../client/components/${req.body.name}.vue`);

  res.status(200).send({
    message: 'Success'
  });
};
