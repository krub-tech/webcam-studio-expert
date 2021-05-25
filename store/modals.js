/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  current: null,
})

export const actions = {
  //   async get(ctx, category) {
  //     ctx.commit('setCategory', category)
  //     const options = await this.$api.usefulLinks.getOptions()
  //     ctx.commit('setOptions', options)
  //     const links = await this.$api.usefulLinks.getByCategory({ category })
  //     ctx.commit('setLinks', links.results)
  //     const count = await this.$api.usefulLinks.getCountByCategory()
  //     ctx.commit('setCount', count)
  //   },
}

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
}
