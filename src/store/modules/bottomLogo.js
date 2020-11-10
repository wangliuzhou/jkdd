export default {
  namespaced: true,
  state: {
    logoInfo: {}
  },
  mutations: {
    setLogoInfo(state, logoInfo) {
      state.logoInfo = logoInfo;
    }
  },
  actions: {
    setBottomLogoInfo({ commit }, payload) {
      commit("setLogoInfo", payload);
    }
  },
  getters: {}
};
