/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
import { getDistrictsByCity } from '@/api/cities'

export const state = () => ({
  uniques: null,
  current: null,
  districts: null,
})
export const mutations = {
  updateCitiesUniques(state, payload) {
    state.uniques = payload
  },
  updateCurrentById(state, payload) {
    if (state.uniques)
      state.current = state.uniques.find((city) => city.id === payload)
  },
  updateDistricts(state, payload) {
    state.districts = payload
  },
}

export const actions = {
  async updateCurrent(ctx, payload) {
    ctx.commit('updateCurrentById', payload)
    const districts = await getDistrictsByCity(this.$axios, payload)
    ctx.commit('updateDistricts', districts)
  },
}
