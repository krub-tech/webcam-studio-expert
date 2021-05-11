import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://78.47.247.176:4545/api',
})

export function postFormData(data) {
  return client({
    method: 'post',
    url: data.query,
    data: data.formData,
  })
}

client.interceptors.response.use((response) => response.data)
