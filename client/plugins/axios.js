export default function ({
  $axios,
  redirect
}) {
  $axios.onRequest(config => {
    const auth = `Basic ${Buffer.from('multikey.studio' + ':' + 'multikeypassword').toString('base64')}`;
    config.headers.common.Authorization = auth;
    config.headers.common['x-api-key'] = '7euikEfoPq';
    return config;
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  });
}
