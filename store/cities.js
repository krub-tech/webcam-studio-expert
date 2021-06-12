/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  uniques: null,
  current: null,
  districts: [],
  districtsSelected: [],
  metro: [],
  metroSelected: [],
})

export const getters = {
  districtsSelected: (state) => {
    if (!state.districtsSelected.length) return null
    return state.districtsSelected.toString()
  },
  metroSelected: (state) => {
    if (!state.metroSelected.length) return null
    return state.metroSelected.toString()
  },
}

export const actions = {
  async updateCurrent(ctx, payload) {
    ctx.commit('setDistricts', [])
    ctx.commit('setMetro', [])
    ctx.commit('setDistrictsSelected', [])
    ctx.commit('setMetroSelected', [])
    ctx.commit('updateCurrentById', payload)

    const [districts, metro] = await Promise.all([
      this.$api.geo.getDistrictsByCity(payload),
      this.$api.geo.getMetroStationsByCity(payload),
    ])
    ctx.commit('setDistricts', districts)
    ctx.commit('setMetro', metro)
    ctx.dispatch('studios/paginate', 1, { root: true })
  },
  updateDistrictsSelected(ctx, payload) {
    ctx.commit('updateDistrictsSelected', payload)
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
  setDistrictsSelected(ctx, payload) {
    ctx.commit('setDistrictsSelected', payload)
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
  updateMetroSelected(ctx, payload) {
    ctx.commit('updateMetroSelected', payload)
    ctx.dispatch('studios/updateCurrents', null, { root: true })
    sessionStorage.metro = JSON.stringify(ctx.state.metroSelected)
  },
  setMetroSelected(ctx, payload) {
    ctx.commit('setMetroSelected', payload)
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
}

export const mutations = {
  updateCitiesUniques(state, payload) {
    state.uniques = payload
  },
  updateCurrentById(state, payload) {
    if (state.uniques) state.current = state.uniques.find((city) => city.id === payload)
  },
  setDistricts(state, payload) {
    state.districts = payload
  },
  updateDistrictsSelected(state, payload) {
    const idx = state.districtsSelected.indexOf(payload)
    if (idx === -1) state.districtsSelected.push(payload)
    else state.districtsSelected.splice(idx, 1)
    sessionStorage.districts = JSON.stringify(state.districtsSelected)
  },
  setDistrictsSelected(state, payload) {
    state.districtsSelected = payload
  },
  setMetro(state, payload) {
    state.metro = payload
  },
  updateMetroSelected(state, payload) {
    const idx = state.metroSelected.indexOf(payload)
    if (idx === -1) state.metroSelected.push(payload)
    else state.metroSelected.splice(idx, 1)
    sessionStorage.metro = JSON.stringify(state.metroSelected)
  },
  setMetroSelected(state, payload) {
    state.metroSelected = payload
  },
}
