import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.baseUrl,
})

export function postFormData(data) {
  return client({
    method: 'post',
    url: data.query,
    data: data.formData,
  })
}

client.interceptors.response.use((response) => response.data)
