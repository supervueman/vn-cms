const fs = require('fs');

module.exports = async (path) => {
  if (!fs.existsSync(path)) {
    await fs.mkdirSync(path);
  } else {
    return {
      message: 'Directory is exist!'
    };
  }
};
