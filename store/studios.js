/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  allByCityLength: null,
  allWithParamsLength: null,
  currents: [],
  options: null,
  search: null,
  ordering: null,
  page: 1,
})
export const mutations = {
  updateAllByCityLength(state, payload) {
    state.allByCityLength = payload
  },
  updateAllWithParamsLength(state, payload) {
    state.allWithParamsLength = payload
  },
  updateCurrentStudios(state, payload) {
    state.currents = payload
  },
  updateStudiosOptions(state, payload) {
    state.options = payload
  },
  updateSearchQuery(state, payload) {
    state.search = payload
  },
  updateOrdering(state, payload) {
    state.ordering = payload
  },
  updatePageNumber(state, payload) {
    state.page = payload
  },
}
export const getters = {
  query: (state, getters, rootState, rootGetters) => ({
    offset: (state.page - 1) * 12,
    city: rootState.cities.current?.id ?? null,
    district: rootGetters['cities/districtsSelected'],
    search: state.search,
    ordering: state.ordering,
    ...rootState.filter.query,
  }),
}

export const actions = {
  async updateCurrents(ctx) {
    const studios = await this.$api.studios.getByQuery(ctx.getters.query)
    ctx.commit('updateAllByCityLength', studios.count_by_city)
    ctx.commit('updateAllWithParamsLength', studios.count)
    ctx.commit('updateCurrentStudios', studios.results)
  },
  paginate(ctx, payload) {
    ctx.commit('updatePageNumber', payload)
    ctx.dispatch('updateCurrents')
  },
}
