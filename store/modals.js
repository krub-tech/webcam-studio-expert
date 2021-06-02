/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

export const state = () => ({
  current: null,
  options: null,
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setOptions(state, payload) {
    state.options = payload
  },
}
