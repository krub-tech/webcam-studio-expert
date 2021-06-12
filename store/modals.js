/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

export const state = () => ({
  current: null,
  prev: null,
  options: null,
  notClose: false,
})

export const mutations = {
  setCurrent(state, payload) {
    console.log('csjn')
    state.current = payload
  },
  setPrev(state, payload) {
    state.prev = payload
  },
  setOptions(state, payload) {
    state.options = payload
  },
  setNotClose(state, payload) {
    state.notClose = payload
  },
}
