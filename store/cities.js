export const state = () => ({
  uniques: null,
  current: 'Санкт-Петербург',
})
export const mutations = {
  updateCitiesUniques(state, payload) {
    state.uniques = payload
  },
  updateCitiesCurrent(state, payload) {
    state.current = payload
  },
}
