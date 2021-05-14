import { client } from './client'

export function getStudiosOptions() {
  return client.get('user/options/')
}

export function getStudiosByQuery(query) {
  console.log(query)
  return client.get(`user/studios/`, { params: query })
}

export function getStudiosByCity(city) {
  return client.get('user/studios/', { params: { city } })
}

export function getStudioById(id) {
  return client.get(`user/studios/${id}/`)
}
