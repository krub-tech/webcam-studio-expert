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
    const [usefulLinksOptions, studiosOptions, cities, messageOptions] =
      await Promise.all([
        this.$api.usefulLinks.getOptions(),
        this.$api.studios.getOptions(),
        this.$api.geo.getCities(),
        this.$api.messages.getOptions(),
      ])
    ctx.commit('links/setOptions', usefulLinksOptions)
    ctx.commit('studios/updateStudiosOptions', studiosOptions)
    ctx.commit('cities/updateCitiesUniques', cities)
    ctx.commit('modals/setOptions', messageOptions)
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
