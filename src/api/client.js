import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});

export function postFormData(data) {
  return client({
    method: 'post',
    url: data.query,
    data: data.formData,
  });
}

client.interceptors.response.use((response) => response.data);
