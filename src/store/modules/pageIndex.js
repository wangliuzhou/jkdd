/* eslint-disable no-unused-vars */
import { fetchGet } from "@/config/request";

export default {
  namespaced: true,
  state: {
    components: [],
    templateType: null,
    pageConfig: {}
  },
  mutations: {
    setComponents(state, payload) {
      state.components = payload;
    },
    setTemplateType(state, payload) {
      state.templateType = payload;
    },
    setPageConfig(state, payload) {
      state.pageConfig = payload;
    }
  },
  actions: {
    loadData({ state, commit, dispatch }, payload) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet("/store/mobile/tenantPage/findMainPage").then(
        ({ data: { componentArray, templateType } }) => {
          const components = componentArray.map(item => {
            return JSON.parse(item.componentContent || {});
          });
          commit("setComponents", components);
          commit("setTemplateType", templateType);
          if (components && components[0] && components[0].type == "config") {
            commit("setPageConfig", components[0]);
          }
          dispatch("global/setLoading", false, { root: true });
        }
      );
    }
  },
  getters: {}
};
