/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  options: [],
})

export const actions = {}

export const mutations = {
  setOptions(state, payload) {
    state.options = payload
  },
}
