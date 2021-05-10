import axios from 'axios';
import Cookie from 'js-cookie';

export const client = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});

client.interceptors.request.use((config) => {
  if (config.method !== 'get') {
    config.headers['X-CSRFTOKEN'] = Cookie.get('csrftoken');
  }

  return config;
});

export function postFormData(data) {
  return client({
    method: 'post',
    url: data.query,
    data: data.formData,
  });
}

client.interceptors.response.use((response) => response.data);
