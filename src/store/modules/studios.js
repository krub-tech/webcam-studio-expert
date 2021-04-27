const state = {
  filterQuery: [],
  searchQuery: "",
  orderingStudios: "",
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
    let filterQ = "";
    let searchQ = "";
    let orderingType = "";
    let city = `?city=${getters.currentCity}`;
    if (state.filterQuery) {
      filterQ = `&${state.filterQuery}`;
    }
    if (state.searchQuery) {
      filterQ
        ? (searchQ = `search=${state.searchQuery}`)
        : (searchQ = `&search=${state.searchQuery}`);
    }
    if (state.orderingStudios) {
      filterQ && !searchQ
        ? (orderingType = `ordering=${state.orderingStudios}`)
        : (orderingType = `&ordering=${state.orderingStudios}`);
    }
    if (getters.selectedDistricts?.length > 0) {
      city += `&district=${getters.selectedDistricts}`;
    }
    if (getters.selectedDistricts?.length > 0) {
      city += `&district=${getters.selectedDistricts}`;
    }
    if (getters.selectedMetro?.length > 0) {
      city += `&metro=${getters.selectedMetro}`;
    }
    return `${city}&limit=${getters.paginationSize}&offset=${getters.paginationOffset}${filterQ}${searchQ}${orderingType}`;
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
    const response = await this.dispatch("apiGetRequest", "api/user/options");
    this.commit("loadOptionsStudiosToState", response.data);
    console.log("load studio options to state");
  },
  async studiosFromDB() {
    console.log("api query " + this.getters.query);
    let response = await this.dispatch(
      "apiGetRequest",
      `api/user/studios/${this.getters.query}`
    );
    this.commit("loadCurrentStudiosToState", response.data.results);
    this.commit("loadCurrentStudiosLengthToState", response.data.count);
    console.log(`studios load to state`);
  },
  filterStudios({ commit, dispatch }, query) {
    commit("updateFilterQuery", query);
  },
  searchStudios({ commit, dispatch }, query) {
    commit("updateSearchQuery", query);
  },
  sortStudios({ commit, dispatch }, query) {
    commit("updateOrderingStudios", query);
    commit("updatePageNumber", 1);
    dispatch("studiosFromDB");
  },
  async allStudiosLength({ commit, getters }) {
    const response = await this.dispatch(
      "apiGetRequest",
      `api/user/studios/?city=${getters.currentCity}`
    );
    commit("updateAllStudiosLength", response.data.count);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
