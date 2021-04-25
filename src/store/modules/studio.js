const state = {
  currentStudio: {},
}

const getters = {
  currentStudio: (state) => state.currentStudio,
}

const mutations = {
  loadStudioToState: (state, payload) => {
    state.currentStudio = payload
  },
}

const actions = {
  async studioById(ctx, id) {
    console.log('loading current studio...')
    const response = await ctx.dispatch('apiRequest', `api/user/studios/${id}`)
    ctx.commit('loadStudioToState', response.data)
    console.log('load current studio to state')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
