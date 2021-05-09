/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { getUniqueCities, getDistrictsByCity, getMetroByCity } from '@/api/cities';

const state = {
  unique_cities: [],
  currentCity: 'Санкт-Петербург',
  districtsByCurrentCity: [],
  selectedDistricts: [],
  metroByCurrentCity: [],
  selectedMetro: [],
};

const getters = {
  currentCity: (state) => state.currentCity,
  selectedDistricts: (state) => state.selectedDistricts,
  metroNamesByCurrentCity: (state) => [...new Set(state.metroByCurrentCity.map((el) => el.name))],
  selectedMetro: (state) => state.selectedMetro,
};

const mutations = {
  updateUniqueCities(state, payload) {
    state.unique_cities = payload;
  },
  updateCurrentCity(state, payload) {
    state.currentCity = payload;
  },
  updateDistrictsByCurrentCity(state, payload) {
    state.districtsByCurrentCity = payload;
  },
  updateSelectedDistricts(state, payload) {
    state.selectedDistricts = payload;
  },
  updateMetroByCurrentCity(state, payload) {
    state.metroByCurrentCity = payload;
  },
  updateSelectedMetro(state, payload) {
    state.selectedMetro = payload;
  },
};

const actions = {
  async getUniqueCities({ dispatch, commit }) {
    const response = await getUniqueCities();
    commit('updateUniqueCities', response);
    dispatch('getDistrictsByCurrentCity');
    dispatch('getMetroByCurrentCity');
  },
  async getDistrictsByCurrentCity(ctx) {
    const response = await getDistrictsByCity(ctx.state.currentCity);
    ctx.commit('updateDistrictsByCurrentCity', response);
  },
  async getMetroByCurrentCity(ctx) {
    const response = await getMetroByCity(ctx.state.currentCity);
    ctx.commit('updateMetroByCurrentCity', response);
  },
  updateCurrentCity({ dispatch, commit }, data) {
    commit('updateCurrentCity', data);
    dispatch('getDistrictsByCurrentCity');
    commit('updateSelectedDistricts', []);
    dispatch('getMetroByCurrentCity');
    commit('updateSelectedMetro', []);
    commit('updatePageNumber', 1);
    dispatch('studiosFromDB');
    dispatch('allStudiosLength');
  },
  updateSelectedDistricts(ctx, payload) {
    ctx.commit('updateSelectedDistricts', payload);
    ctx.dispatch('studiosFromDB');
  },
  updateSelectedMetro(ctx, payload) {
    ctx.commit('updateSelectedMetro', payload);
    ctx.dispatch('studiosFromDB');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
