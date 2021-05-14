export const state = () => ({
  windowWidth: 0,
})
export const mutations = {
  updateWindowWidth(state, payload) {
    state.windowWidth = payload
  },
}
export const getters = {
  isMobile: (state) => {
    return state.windowWidth < 420
  },
}
