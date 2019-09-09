const fs = require('fs');

module.exports = async (dirName) => {
  if (!fs.existsSync(`../files/${dirName}`)) {
    await fs.mkdirSync(`../files/${dirName}`);
  }
}
