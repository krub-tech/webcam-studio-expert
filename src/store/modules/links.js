/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { getLinksOptions, getLinks, linksCategoryLength } from '@/api/links';

const state = {
  currentLinksCategory: 'telegram_channels',
  usefulLinksOptions: [],
  usefulLinks: [],
  usefulLinksLengthByCategoryToState: [],
  linksQuery: '',
};

const getters = {
  usefulLinksOptions: (state) => state.usefulLinksOptions,
  usefulLinks: (state) => state.usefulLinks,
  usefulLinksLengthByCategory: (state) => state.usefulLinksLengthByCategoryToState,
};

const mutations = {
  loadCurrentLinksCategory: (state, payload) => {
    state.currentLinksCategory = payload;
  },
  loadUsefulLinksOptionsToState: (state, payload) => {
    state.usefulLinksOptions = payload;
  },
  loadUsefulLinksToState: (state, payload) => {
    state.usefulLinks = payload;
  },
  loadUsefulLinksLengthByCategoryToState: (state, payload) => {
    state.usefulLinksLengthByCategoryToState = payload;
  },
};

const actions = {
  async getLinksOptionsFromDB(ctx) {
    console.log('loading useful_links options...');
    const response = await getLinksOptions();
    ctx.commit('loadUsefulLinksOptionsToState', response);
  },
  async getLinksFromDB(ctx, query) {
    console.log('loading useful_links...');
    const response = await getLinks(query);
    ctx.commit('loadUsefulLinksToState', response.results);
  },
  async getLinksLengthByCategory(ctx) {
    const response = await linksCategoryLength();
    ctx.commit('loadUsefulLinksLengthByCategoryToState', response);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
