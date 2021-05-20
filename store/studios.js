/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
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
  query: (state, getters, rootState) => ({
    city: rootState.cities.current?.id ?? null,
    ordering: state.ordering,
    ...rootState.filter.query,
  }),
}

export const actions = {
  async updateCurrents(ctx) {
    const studiosAllByCity = await getStudiosByQuery(this.$axios, {
      city: ctx.getters.query.city,
    })
    ctx.commit('updateAllByCityLength', studiosAllByCity.count)
    const studios = await getStudiosByQuery(this.$axios, ctx.getters.query)
    ctx.commit('updateCurrentStudios', studios.results)
  },
}
