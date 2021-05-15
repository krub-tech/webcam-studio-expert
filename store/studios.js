export const state = () => ({
  currents: null,
  options: null,
  ordering: null,
})
export const mutations = {
  updateCurrentStudios(state, payload) {
    state.currents = payload
  },
  updateStudiosOptions(state, payload) {
    state.options = payload
  },
  updateOrdering(state, payload) {
    state.ordering = payload
  },
}
export const getters = {
  query: (state, getters, rootState) => {
    return {
      city: rootState.cities.current.id,
      ordering: state.ordering,
    }
  },
}
