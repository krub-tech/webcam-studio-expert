const state = {
  pageNumber: 1,
  paginationSize: 12,
};

const getters = {
  pageNumber: (state) => state.pageNumber,
  paginationSize: (state) => state.paginationSize,
  paginationOffset: (state) =>
    state.pageNumber * state.paginationSize - state.paginationSize,
};

const mutations = {
  updatePageNumber: (state, payload) => {
    state.pageNumber = payload;
  },
};

const actions = {
  paginate(ctx, pageNumber) {
    // console.log(`go to ${pageNumber} page...`)
    ctx.commit("updatePageNumber", pageNumber);
    ctx.dispatch("studiosFromDB");
    document.querySelector(".window-top").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    console.log(`on ${pageNumber} page`);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
