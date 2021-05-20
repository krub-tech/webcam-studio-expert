/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  params: {
    studio_type: [],
    models_age: [],
    working_with_model_types: [],
    min_payout_percentage: [],
    shift_length: [],
    max_shifts_per_week: [],
    staff_gender: [],
    devices: [],
    conditions: [],
    support_staff: [],
    certified: [],
  },
  query: null,
})
export const mutations = {
  setFilter(state, payload) {
    state.params = payload
  },
  updateParams(state, { key, data }) {
    const idx = state.params[key].indexOf(data)
    if (idx === -1) state.params[key].push(data)
    else state.params[key].splice(idx, 1)
  },
  setParams(state, { key, data }) {
    state.params[key] = data
  },
  updateQuery(state, { key, data }) {
    state.query = {
      ...state.query,
      [key]: data,
    }
  },
  resetParams(state) {
    Object.keys(state.params).forEach((key) => {
      state.params[key] = []
    })
  },
  resetQuery(state) {
    state.query = null
  },
}

export const actions = {
  update(ctx, { key, data }) {
    ctx.commit('updateParams', { key, data })
    ctx.dispatch('build')
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
  set(ctx, { key, data }) {
    ctx.commit('setParams', { key, data })
    ctx.dispatch('build')
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
  change(ctx, payload) {
    ctx.commit('setFilter', payload)
    ctx.dispatch('build')
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
  build(ctx) {
    ctx.commit('studios/updatePageNumber', 1, { root: true })
    Object.entries(ctx.state.params).forEach(([key, value]) => {
      if (value.length)
        ctx.commit('updateQuery', { key, data: value.toString() })
      else ctx.commit('updateQuery', { key, data: null })
    })
    sessionStorage.filter = JSON.stringify(ctx.state.params)
  },
  reset(ctx) {
    ctx.commit('resetParams')
    ctx.commit('resetQuery')
    sessionStorage.filter = JSON.stringify(ctx.state.params)
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
}
