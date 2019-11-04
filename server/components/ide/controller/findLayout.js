const fs = require('fs');

module.exports = async (req, res) => {
  fs.readFile(`../../client/layouts/${req.query.name}.vue`, {
    encoding: 'utf-8'
  }, (err, data) => {
    if (!err) {
      res.status(200).send({
        code: data
      });
    } else {
      res.status(404).send({
        message: 'Not found!'
      });
    }
  });
};
