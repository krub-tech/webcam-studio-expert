export const state = () => ({
  uniques: null,
})
export const mutations = {
  updateUniquesCities(state, payload) {
    state.uniques = payload
  },
}
