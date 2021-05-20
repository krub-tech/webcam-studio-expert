/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
import { getDistrictsByCity } from '@/api/cities'

export const state = () => ({
  uniques: null,
  current: null,
  districts: null,
  districtsSelected: [],
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
  updateDistrictsSelected(state, payload) {
    const idx = state.districtsSelected.indexOf(payload)
    if (idx === -1) state.districtsSelected.push(payload)
    else state.districtsSelected.splice(idx, 1)
  },
  setDistrictsSelected(state, payload) {
    state.districtsSelected = payload
  },
}

export const getters = {
  districtsSelected: (state) => {
    if (!state.districtsSelected.length) return null
    return state.districtsSelected.toString()
  },
}

export const actions = {
  async updateCurrent(ctx, payload) {
    ctx.commit('updateDistricts', null)
    ctx.commit('setDistrictsSelected', [])
    ctx.commit('updateCurrentById', payload)
    const districts = await getDistrictsByCity(this.$axios, payload)
    ctx.commit('updateDistricts', districts)
  },
  async updateDistrictsSelected(ctx, payload) {
    ctx.commit('updateDistrictsSelected', payload)
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
}
