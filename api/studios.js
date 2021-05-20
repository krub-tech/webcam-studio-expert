const resource = 'user'
export default ($axios) => ({
  getOptions() {
    return $axios.$get(`${resource}/options/`)
  },

  getByQuery(query) {
    console.log('query', query)
    return $axios.$get(`${resource}/studios/`, { params: query })
  },

  getById(id) {
    return $axios.$get(`${resource}/studios/${id}/`)
  },
})
