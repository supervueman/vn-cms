const fs = require('fs');

module.exports = async (req, res) => {
  if (!req.adminAccess) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  fs.writeFile(`../../client/pages/${req.body.name}.vue`, req.body.content, function (err) {
    if (err) {
      res.status(500).send({
        message: 'Server Error!'
      });
      return;
    }
  });

  res.status(200).send({
    message: 'Success!'
  });
};
