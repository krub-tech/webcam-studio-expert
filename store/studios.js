/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  allByCityLength: null,
  allWithParamsLength: null,
  currents: [],
  options: null,
  search: null,
  ordering: null,
  page: 1,
  favorites: [],
})

export const getters = {
  query: (state, getters, rootState, rootGetters) => ({
    offset: (state.page - 1) * 12,
    city: rootState.cities.current?.id ?? null,
    district: rootGetters['cities/districtsSelected'],
    metro: rootGetters['cities/metroSelected'],
    search: state.search,
    ordering: state.ordering,
    ...rootState.filter.query,
  }),
}

export const actions = {
  async updateCurrents(ctx) {
    const studios = await this.$api.studios.getByQuery(ctx.getters.query)
    console.dir(studios)
    ctx.commit('updateAllByCityLength', studios.count_by_city)
    ctx.commit('updateAllWithParamsLength', studios.count)
    ctx.commit('updateCurrentStudios', studios.results)
  },
  paginate(ctx, payload) {
    ctx.commit('updatePageNumber', payload)
    ctx.dispatch('updateCurrents')
  },
  async toFavorites(ctx, id) {
    const response = await this.$api.studios.getById(id)
    ctx.commit('addStudioToFavorites', response)
  },
}

export const mutations = {
  updateAllByCityLength(state, payload) {
    state.allByCityLength = payload
  },
  updateAllWithParamsLength(state, payload) {
    state.allWithParamsLength = payload
  },
  updateCurrentStudios(state, payload) {
    state.currents = payload
  },
  updateStudiosOptions(state, payload) {
    state.options = payload
  },
  updateSearchQuery(state, payload) {
    state.search = payload
  },
  updateOrdering(state, payload) {
    state.ordering = payload
  },
  updatePageNumber(state, payload) {
    state.page = payload
  },
  addStudioToFavorites(state, payload) {
    if (!state.favorites.length) {
      state.favorites.push(payload)
    } else {
      let idx = null
      state.favorites.forEach((el) => {
        if (+el.id === +payload.id) {
          idx = el.id
        }
      })
      if (idx != null) {
        state.favorites = state.favorites.filter((el) => +el.id !== +idx)
      } else state.favorites.push(payload)
    }
    localStorage.favorites = JSON.stringify(state.favorites)
  },
  setFavorites(state, payload) {
    state.favorites = payload
  },
}
