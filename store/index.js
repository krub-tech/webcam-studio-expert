/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  windowWidth: 0,
  isMenuOpen: false,
})
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
export const getters = {
  isMobile: (state) => state.windowWidth < 420,
  isMenuOpen: (state, getters) => {
    if (getters.isMobile) return state.isMenuOpen
    return true
  },
}
