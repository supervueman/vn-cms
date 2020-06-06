const fs = require('fs');
const statusAlias = require('../helpers/statusAlias');

module.exports = (type, component, status, controller, error) => {
  const errorMessage = error
    ? error
    : `${component} ${statusAlias[status].alias}`;

  const errorLog = `
DATE: ${new Date().toLocaleString({
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })}
Module: [${component}]
Status: [${status}]
Controller: [${controller}]
ERROR: [${errorMessage}]\n
`;

  if (!fs.existsSync('../logs')) {
    fs.mkdirSync('../logs');
  }

  fs.appendFile(`../logs/${type}-${component}.txt`, errorLog, (err) => {
    if (err) throw err;
  });
};
