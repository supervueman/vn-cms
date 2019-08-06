/**
 * @module requestData
 * @function
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Object} params
 * @var {String} access_token
 * @var {Object} requestData
 * @var {Boolean} isData
 * @var {Boolean} isParams
 * @var {Boolean} isAccessToken
 * @var {Boolean} isId
 * @return {Object}
 */
export default (method, url, data, params) => {
  const access_token = localStorage.getItem('access_token');
  const apiKey = localStorage.getItem('x-api-key')
  const isData = data !== '' && data !== undefined;
  const isParams = params !== '' && params !== undefined;

  const requestData = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': access_token,
      'x-api-key': apiKey
    }
  }

  if (isData) {
    requestData.data = data;
    const isId = data.id === '' || data.id === undefined;
    if (isId) {
      delete data.id;
    }
  }
  if (isParams) {
    requestData.params = params;
  }
  requestData.headers.Authorization = `Basic ${new Buffer('multikey.studio' + ':' + 'multikeypassword').toString('base64')}`;

  return requestData;
}
