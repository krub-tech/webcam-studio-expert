import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import cities from "./modules/cities";
import studios from "./modules/studios";
import studio from "./modules/studio";
import pagination from "./modules/pagination";
import favorites from "./modules/favorites";
import links from "./modules/links";
import modals from "./modules/modals";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0,
    isMenuOpen: true,
    localAddress: "http://78.47.247.176:4545",
  },
  getters: {
    windowWidth: (state) => state.windowWidth,
  },
  mutations: {
    updateWindowWidth(state, payload) {
      state.windowWidth = payload;
    },
    menuOpen(state) {
      if (!state.isMenuOpen) state.isMenuOpen = true;
    },
    menuHide(state) {
      if (state.isMenuOpen && state.windowWidth < 420) state.isMenuOpen = false;
    },
  },
  actions: {
    apiGetRequest(ctx, query) {
      if (window.location.href.startsWith("https")) {
        ctx.state.localAddress = "";
      }
      return axios.get(`${ctx.state.localAddress}/${query}`);
    },
    apiPostRequest(ctx, data) {
      if (window.location.href.startsWith("https")) {
        ctx.state.localAddress = "";
      }
      return axios({
        method: "post",
        url: `${ctx.state.localAddress}/${data.query}`,
        data: data.formData,
      });
    },
  },
  modules: {
    cities,
    studios,
    studio,
    pagination,
    favorites,
    links,
    modals,
  },
});
