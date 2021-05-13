import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://78.47.247.176:4545/api'
    : '/api'

export const client = axios.create({
  baseURL: baseUrl,
})

export function postFormData(data) {
  return client({
    method: 'post',
    url: data.query,
    data: data.formData,
  })
}

client.interceptors.response.use((response) => response.data)
