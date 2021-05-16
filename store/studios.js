export const state = () => ({
  cityStudiosLength: null,
  currents: null,
  options: null,
  ordering: null,
  filter: null,
})
export const mutations = {
  updateCityStudiosLength(state, payload) {
    state.cityStudiosLength = payload
  },
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
    state.filter = Object.assign({}, payload)
  },
  filterReset: (state) => {
    state.filter = null
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

export const actions = {}
