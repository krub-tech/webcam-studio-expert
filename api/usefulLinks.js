const resource = 'useful_links'
export default ($axios) => ({
  getOptions() {
    return $axios.$get(`${resource}/options/`)
  },

  getByCategory(category) {
    return $axios.$get(`${resource}/links/${category}`)
  },

  getCountByCategory() {
    return $axios.$get(`${resource}/count/`)
  },
})
