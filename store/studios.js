export const state = () => ({
  currents: null,
  options: null,
})
export const mutations = {
  updateCurrentStudios(state, payload) {
    state.currents = payload
  },
  updateStudiosOptions(state, payload) {
    state.options = payload
  },
}
