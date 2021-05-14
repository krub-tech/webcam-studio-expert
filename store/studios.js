export const state = () => ({
  currentStudios: null,
})
export const mutations = {
  updateCurrentStudios(state, payload) {
    state.currentStudios = payload
  },
}
export const getters = {}
