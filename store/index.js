/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  windowWidth: 0,
  isMenuOpen: false,
})

export const getters = {
  isMobile: (state) => state.windowWidth < 420,
  isMenuOpen: (state, getters) => {
    if (getters.isMobile) return state.isMenuOpen
    return true
  },
}

export const actions = {
  async nuxtServerInit(ctx) {
    ctx.commit('cities/updateCurrentById', 'sankt-peterburg')
    const [studios, options, cities] = await Promise.all([
      this.$api.studios.getByQuery(ctx.getters['studios/query']),
      this.$api.studios.getOptions(),
      this.$api.geo.getCities(),
    ])
    ctx.commit('studios/updateStudiosOptions', options)
    ctx.commit('cities/updateCitiesUniques', cities)
    ctx.commit('studios/updateCurrentStudios', studios.results)
  },
  menuToggle(ctx) {
    if (ctx.state.isMenuOpen) ctx.commit('menuClose')
    else ctx.commit('menuOpen')
  },
}

export const mutations = {
  updateWindowWidth(state, payload) {
    state.windowWidth = payload
  },
  menuOpen(state) {
    state.isMenuOpen = true
  },
  menuClose(state) {
    state.isMenuOpen = false
  },
}
