/* eslint-disable no-unused-vars */
import { fetchGet } from "@/config/request";

export default {
  namespaced: true,
  state: {
    components: []
  },
  mutations: {
    setComponents(state, payload) {
      state.components = payload;
    }
  },
  actions: {
    loadData({ state, commit, dispatch }, payload) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet("/store/mobile/tenantPage/findMainPage").then(
        ({ data: { componentArray } }) => {
          commit(
            "setComponents",
            componentArray.map(item => {
              return JSON.parse(item.componentContent || {});
            })
          );
          dispatch("global/setLoading", false, { root: true });
        }
      );
    }
  },
  getters: {}
};
