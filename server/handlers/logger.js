const fs = require('fs');

module.exports = (type, component, status, controller, error) => {
  const statusesAlias = {
    404: 'not found',
    403: 'forbidden',
    400: 'Bad request',
    409: 'Conflict',
    401: 'Unauthorized'
  };

  const errorMessage = error ? error : `${component} ${statusesAlias[status]}`;

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

  fs.appendFile(`../logs/${type}-${component}.txt`, errorLog, function (err) {
    if (err) throw err;
  });
};
