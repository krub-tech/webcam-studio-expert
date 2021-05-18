/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  uniques: null,
  current: { id: 'sankt-peterburg', name: 'Санкт-Петербург' },
})
export const mutations = {
  updateCitiesUniques(state, payload) {
    state.uniques = payload
  },
  updateCitiesCurrentById(state, payload) {
    if (state.uniques)
      state.current = state.uniques.find((city) => city.id === payload)
  },
}
