/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { getUniqueCities, getDistrictsByCity, getMetroByCity } from '@/api/cities';

const state = {
  unique_cities: [],
  currentCity: 'Санкт-Петербург',
  districtsByCurrentCity: [],
  selectedDistricts: [],
  metroByCity: [],
  selectedMetro: [],
};

const getters = {
  currentCity: (state) => state.currentCity,
  selectedDistricts: (state) => state.selectedDistricts,
  metroNames: (state) => [...new Set(state.metroByCity.map((el) => el.name))],
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
  updateMetroByCity(state, payload) {
    state.metroByCity = payload;
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
    ctx.commit('updateMetroByCity', response);
  },
  updateCurrentCity({ dispatch, commit }, data) {
    commit('updateCurrentCity', data);
    dispatch('getDistrictsByCurrentCity');
    commit('updateSelectedDistricts', []);
    dispatch('getMetroByCurrentCity');
    commit('updatePageNumber', 1);
    dispatch('studiosFromDB');
    dispatch('allStudiosLength');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
