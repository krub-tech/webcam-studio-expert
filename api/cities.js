export function getUniqueCities(client) {
  return client.$get('geo_info/cities/')
}

export function getDistrictsByCity(client, city) {
  return client.$get('geo_info/districts/', { params: { city } })
}

export function getMetroByCity(client, city) {
  return client.$get('geo_info/metro_stations/', { params: { city } })
}
