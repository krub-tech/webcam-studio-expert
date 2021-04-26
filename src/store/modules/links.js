const state = {
  currentLinksCategory: "telegram_channels",
  usefulLinksOptions: [],
  usefulLinks: [],
  usefulLinksLengthByCategoryToState: [],
  linksQuery: "",
};

const getters = {
  usefulLinksOptions: (state) => state.usefulLinksOptions,
  usefulLinks: (state) => state.usefulLinks,
  usefulLinksLengthByCategory: (state) =>
    state.usefulLinksLengthByCategoryToState,
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
    console.log("loading useful_links options...");
    const response = await ctx.dispatch(
      "apiRequest",
      "api/useful_links/options"
    );
    ctx.commit("loadUsefulLinksOptionsToState", response.data);
    console.log("load useful_links options to state");
  },
  async getLinksFromDB(ctx, query) {
    console.log("loading useful_links...");
    const response = await ctx.dispatch("apiRequest", query);
    ctx.commit("loadUsefulLinksToState", response.data.results);
    console.log("load useful_links to state");
  },
  async getLinksLengthByCategory(ctx) {
    const response = await ctx.dispatch("apiRequest", "api/useful_links/count");
    ctx.commit("loadUsefulLinksLengthByCategoryToState", response.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
