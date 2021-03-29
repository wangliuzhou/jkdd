/* eslint-disable no-unused-vars */
import { fetchGet } from "@/config/request";

export default {
  namespaced: true,
  state: {
    pageConfig: {}
  },
  mutations: {
    setPageConfig(state, payload) {
      state.pageConfig = payload;
    }
  },
  actions: {
    loadData({ state, commit, dispatch }, payload) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet("/store/mobile/tenantPage/findMainPage").then(
        ({ data: { componentArray, templateType } }) => {
          commit("setPageConfig", 33333);
          dispatch("global/setLoading", false, { root: true });
        }
      );
    }
  },
  getters: {}
};
