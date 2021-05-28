const resource = 'message'
export default ($axios) => ({
  getOptions() {
    return $axios.$get(`${resource}/options/`)
  },

  createFeedback(data) {
    return $axios.$post(`${resource}/input/`, data)
  },
})
