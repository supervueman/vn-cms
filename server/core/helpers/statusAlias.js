module.exports = {
  400: {
    alias: 'Bad request',
    type: 'error'
  },
  401: {
    alias: 'Unauthorized',
    type: 'error'
  },
  403: {
    alias: 'Forbidden',
    type: 'error'
  },
  404: {
    alias: 'Not found',
    type: 'error'
  },
  200: {
    alias: 'OK'
  },
  204: {
    alias: 'No content'
  },
  500: {
    alias: 'Server error',
    type: 'error'
  }
};
