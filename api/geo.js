const resource = 'geo_info'
export default ($axios) => ({
  getCities() {
    return $axios.$get(`${resource}/cities/`)
  },

  getDistrictsByCity(city) {
    return $axios.$get(`${resource}/districts/`, { params: { city } })
  },

  getMetroStationsByCity(city) {
    return $axios.$get(`${resource}/metro_stations/`, { params: { city } })
  },
})
