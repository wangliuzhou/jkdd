import { fetchGet } from "@/config/request";

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
    getBottomInfo({ commit }) {
      fetchGet("/apply/mobile/storesysLogo/getLogoInfo").then(({ data }) => {
        commit("setLogoInfo", data || {});
      });
    }
  },
  getters: {}
};
