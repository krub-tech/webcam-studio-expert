const resource = 'message'
export default ($axios) => ({
  getOptions() {
    return $axios.$get(`${resource}/options/`)
  },
})
