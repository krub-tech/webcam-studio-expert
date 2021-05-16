export const state = () => ({
  currents: null,
  options: null,
  ordering: null,
  filter: null,
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
  updateFilter(state, payload) {
    state.filter = payload
  },
}
export const getters = {
  query: (state, getters, rootState) => {
    return {
      city: rootState.cities.current.id,
      ordering: state.ordering,
      ...state.filter,
    }
  },
}
