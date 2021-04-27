const state = {
  unique_cities: [],
  currentCity: "Санкт-Петербург",
  districtsByCurrentCity: [],
  selectedDistricts: [],
  metroByCity: [],
  selectedMetro: [],
};

const getters = {
  currentCity: (state) => state.currentCity,
  selectedDistricts: (state) => state.selectedDistricts,
  metroNames: (state) => {
    return [...new Set(state.metroByCity.map((el) => el.name))];
  },
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
    const response = await dispatch("apiGetRequest", "api/geo_info/cities/");
    commit("updateUniqueCities", response.data);
    dispatch("getDistrictsByCurrentCity");
    dispatch("getMetroByCity");
  },
  async getDistrictsByCurrentCity(ctx) {
    const response = await ctx.dispatch(
      "apiGetRequest",
      `api/geo_info/districts/?city=${ctx.state.currentCity}`
    );
    ctx.commit("updateDistrictsByCurrentCity", response.data);
  },
  async getMetroByCity(ctx) {
    const response = await ctx.dispatch(
      "apiGetRequest",
      `api/geo_info/metro_stations/?city=${ctx.state.currentCity}`
    );
    ctx.commit("updateMetroByCity", response.data);
  },
  updateCurrentCity({ dispatch, commit }, data) {
    commit("updateCurrentCity", data);
    dispatch("getDistrictsByCurrentCity");
    commit("updateSelectedDistricts", []);
    dispatch("getMetroByCity");
    commit("updatePageNumber", 1);
    dispatch("studiosFromDB");
    dispatch("allStudiosLength");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
