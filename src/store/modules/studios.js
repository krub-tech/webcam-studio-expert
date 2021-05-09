/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

import { getOptionsStudios, getStudios, getStudiosByCity } from '@/api/studios';

const state = {
  filterQuery: [],
  searchQuery: '',
  orderingStudios: '',
  optionsStudios: [],
  currentStudios: [],
  currentStudiosLength: 0,
  allStudiosLength: 0,
};

const getters = {
  filterQuery: (state) => state.filterQuery,
  searchQuery: (state) => state.searchQuery,
  orderingStudios: (state) => state.orderingStudios,
  optionsStudios: (state) => state.optionsStudios,
  currentStudios: (state) => state.currentStudios,
  currentStudiosLength: (state) => state.currentStudiosLength,
  allStudiosLength: (state) => state.allStudiosLength,
  query: (state, getters) => {
    let filterQ = '';
    const searchQ = state.searchQuery;
    let ordType = '';
    let city = `?city=${getters.currentCity}`;
    if (state.filterQuery) {
      filterQ = `${state.filterQuery}`;
    }
    if (state.orderingStudios) {
      ordType = `&ordering=${state.orderingStudios}`;
    }
    if (getters.selectedDistricts?.length) {
      city += `&district=${getters.selectedDistricts}`;
    }
    if (getters.selectedMetro?.length > 0) {
      city += `&metro=${getters.selectedMetro}`;
    }
    return `${city}&limit=${getters.paginationSize}&offset=${getters.paginationOffset}${filterQ}${searchQ}${ordType}`;
  },
};

const mutations = {
  loadOptionsStudiosToState(state, payload) {
    state.optionsStudios = payload;
  },
  loadCurrentStudiosToState(state, payload) {
    state.currentStudios = payload;
  },
  loadCurrentStudiosLengthToState(state, payload) {
    state.currentStudiosLength = payload;
  },
  updateFilterQuery(state, payload) {
    state.filterQuery = payload;
  },
  updateSearchQuery(state, payload) {
    state.searchQuery = payload;
  },
  updateOrderingStudios(state, payload) {
    state.orderingStudios = payload;
  },
  updateAllStudiosLength(state, payload) {
    state.allStudiosLength = payload;
  },
};

const actions = {
  async optionsStudiosFromDB() {
    const response = await getOptionsStudios();
    this.commit('loadOptionsStudiosToState', response);
    console.log('studio options load to state');
  },
  async studiosFromDB() {
    console.log(`api query ${this.getters.query}`);
    const response = await getStudios(this.getters.query);
    this.commit('loadCurrentStudiosToState', response.results);
    this.commit('loadCurrentStudiosLengthToState', response.count);
    console.log('studios load to state');
  },
  filterStudios({ commit }, query) {
    commit('updateFilterQuery', query);
  },
  searchStudios({ commit }, query) {
    commit('updateSearchQuery', query);
  },
  sortStudios({ commit, dispatch }, query) {
    commit('updateOrderingStudios', query);
    commit('updatePageNumber', 1);
    dispatch('studiosFromDB');
  },
  async allStudiosLength({ commit, getters }) {
    const response = await getStudiosByCity(getters.currentCity);
    commit('updateAllStudiosLength', response.count);
  },
  updateSearchQuery(ctx, payload) {
    ctx.commit('updateSearchQuery', payload);
    ctx.dispatch('studiosFromDB');
  },
  updateFilterQuery(ctx, payload) {
    ctx.commit('updateFilterQuery', payload);
    ctx.dispatch('studiosFromDB');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
