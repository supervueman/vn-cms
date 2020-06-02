const fs = require('fs');

module.exports = (path) => {
  fs.stat(path, function (err) {

    if (err) {
      return console.error(err);
    }

    fs.unlink(path, function (err) {
      if (err) return console.log(err);
    });
  });
};
