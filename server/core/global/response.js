const statusAlias = require('../helpers/statusAlias');

module.exports = ({ res, status, message, data }) => {
  const statusItem = statusAlias[status];

  const resObject = {
    message: message
      ? `[${statusItem.alias}]: ${message}`
      : `[${statusItem.alias}]`
  };

  if (data) {
    resObject.data = data;
  }

  res.status(status).send(data ? data : resObject);

  if (statusItem.type === 'error') {
    throw new Error(resObject.message);
  }
};
