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
  updateParams(state, { key, data }) {
    this.$toArray(state.params[key], data)
  },
  updateQuery(state, { key, data }) {
    state.query = {
      ...state.query,
      [key]: data,
    }
  },
  resetParams(state) {
    for (const key of Object.keys(state.params)) {
      state.params[key] = []
    }
  },
  resetQuery(state) {
    state.query = null
  },
}

export const actions = {
  update(ctx, { key, data }) {
    ctx.commit('updateParams', { key, data })
    for (const [key, value] of Object.entries(ctx.state.params)) {
      if (value.length)
        ctx.commit('updateQuery', { key, data: value.toString() })
    }
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
  reset(ctx) {
    ctx.commit('resetParams')
    ctx.commit('resetQuery')
    ctx.dispatch('studios/updateCurrents', null, { root: true })
  },
}
