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

  specSelection(data) {
    return $axios.$post(`${resource}/help_in_selecting_studio/`, data)
  },
})
