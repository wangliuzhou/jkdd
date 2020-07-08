export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    _setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("_setLoading", payload);
    }
  },
  getters: {}
};
