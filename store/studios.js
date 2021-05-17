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
  updateFilter(state, { key, data }) {
    console.log(this.$toArray)
    state.filter = {
      ...state.filter,
      [key]: data,
    }
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
      ...rootState.filter.query,
    }
  },
}

export const actions = {}
