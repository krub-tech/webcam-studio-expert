/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  category: 'telegram_channels',
  options: [],
  currents: [],
  count: 0,
})

export const actions = {
  async get(ctx, category) {
    ctx.commit('setCategory', category)
    const options = await this.$api.usefulLinks.getOptions()
    ctx.commit('setOptions', options)
    const links = await this.$api.usefulLinks.getByCategory({ category })
    ctx.commit('setLinks', links.results)
    const count = await this.$api.usefulLinks.getCountByCategory()
    ctx.commit('setCount', count)
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
  setCount(state, payload) {
    state.count = payload
  },
}
