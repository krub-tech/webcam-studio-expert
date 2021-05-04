/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { getStudioById } from '@/api/studios';

const state = {
  currentStudio: {},
};

const getters = {
  currentStudio: (state) => state.currentStudio,
};

const mutations = {
  loadStudioToState: (state, payload) => {
    state.currentStudio = payload;
  },
};

const actions = {
  async studioById(ctx, id) {
    console.log('loading current studio...');
    const response = await getStudioById(id);
    ctx.commit('loadStudioToState', response);
    console.log('load current studio to state');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
