export const state = () => ({
  query: null,
})
export const mutations = {
  updateFilter(state, { key, data }) {
    if (!state.query) state.query = {}
    if (!state.query[key]) state.query[key] = []
    this.$toArray(state.query[key], data)
  },
  filterReset(state) {
    state.query = null
  },
}
export const getters = {
  // query: (state, getters, rootState) => {
  //   return {
  //     city: rootState.cities.current.id,
  //     ordering: state.ordering,
  //     ...state.filter,
  //   }
  // },
}
