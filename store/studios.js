import { getStudiosByQuery } from '@/api/studios'

export const state = () => ({
  cityStudiosLength: null,
  currents: null,
  options: null,
  ordering: null,
})
export const mutations = {
  updateAllByCityLength(state, payload) {
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
}
export const getters = {
  query: (state, getters, rootState, rootGetters) => {
    return {
      city: rootState.cities.current.id,
      ordering: state.ordering,
      ...rootState.filter.query,
    }
  },
}

export const actions = {
  async updateCurrents(ctx) {
    const studios = await getStudiosByQuery(ctx.getters.query)
    ctx.commit('updateCurrentStudios', studios.results)
  },
}
