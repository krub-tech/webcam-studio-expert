/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import { getStudioById } from '@/api/studios';

const state = {
  favoritesStudios: [],
  favoritesOpen: false,
};

const getters = {};

const mutations = {
  addStudioToFavoritesStudios: (state, payload) => {
    if (!state.favoritesStudios.length) {
      state.favoritesStudios.push(payload);
    } else {
      let idx = null;
      state.favoritesStudios.forEach((el) => {
        if (el.id === payload.id) {
          idx = el.id;
        }
      });
      if (idx != null) {
        state.favoritesStudios = state.favoritesStudios.filter((el) => +el.id !== +idx);
      } else state.favoritesStudios.push(payload);
    }
    localStorage.clientFavoritesStudios = JSON.stringify(state.favoritesStudios);
  },
  favoritesOpen: (state) => {
    state.favoritesOpen = true;
  },
  favoritesClose: (state) => {
    state.favoritesOpen = false;
  },
};

const actions = {
  async addStudioToFavoritesStudios(ctx, id) {
    console.log(`adding studio with id ${id} to favorites...`);
    const response = await getStudioById(id);
    ctx.commit('addStudioToFavoritesStudios', response);
  },
  getClientFavoritesStudiosFromLS() {
    if (localStorage.clientFavoritesStudios && localStorage.clientFavoritesStudios.length > 2) {
      state.favoritesStudios = JSON.parse(localStorage.clientFavoritesStudios);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
