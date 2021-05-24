/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  category: 'telegram_channels',
  options: [],
  currents: [],
})

export const actions = {
  async get(ctx, category) {
    ctx.commit('setCategory', category)
    const options = await this.$api.usefulLinks.getOptions()
    ctx.commit('setOptions', options)
    const links = await this.$api.usefulLinks.getByCategory({ category })
    ctx.commit('setLinks', links.results)
  },
}

export const mutations = {
  setCategory(state, payload) {
    state.category = payload
  },
  setOptions(state, payload) {
    state.options = payload
  },
  setLinks(state, payload) {
    state.currents = payload
  },
}
