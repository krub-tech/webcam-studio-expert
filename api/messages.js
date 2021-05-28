const resource = 'message'
export default ($axios) => ({
  getOptions() {
    return $axios.$get(`${resource}/options/`)
  },

  messageInput(data) {
    return $axios.$post(`${resource}/input/`, data)
  },

  messageRequest(data) {
    return $axios.$post(`${resource}/request/`, data)
  },
})
