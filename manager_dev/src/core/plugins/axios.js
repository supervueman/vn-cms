import axios from 'axios';

export default () => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL_PROD : process.env.VUE_APP_API_BASE_URL;
}
