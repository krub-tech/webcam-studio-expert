import { client } from './client'

export function getOptionsStudios() {
  return client.get('user/options/')
}

export function getStudios(query) {
  return client.get(`user/studios/`, query)
}

export function getStudiosByCity(city) {
  return client.get('user/studios/', { params: { city } })
}

export function getStudioById(id) {
  return client.get(`user/studios/${id}/`)
}
