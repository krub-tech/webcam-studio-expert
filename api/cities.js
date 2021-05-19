import { client } from './client'

export function getUniqueCities() {
  return client.get('geo_info/cities/')
}

export function getDistrictsByCity(city) {
  return client.get('geo_info/districts/', { params: { city } })
}

export function getMetroByCity(city) {
  return client.get('geo_info/metro_stations/', { params: { city } })
}
