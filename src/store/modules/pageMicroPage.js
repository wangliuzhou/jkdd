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
    loadData({ state, commit, dispatch }, id) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet(`/store/mobile/tenantPage/findPage?pageContentId=${id}`).then(
        ({ data: { componentArray, templateType } }) => {
          commit(
            "setComponents",
            componentArray.map(item => {
              return JSON.parse(item.componentContent || {});
            })
          );
          commit("setTemplateType", templateType);
          if (
            componentArray &&
            componentArray[0] &&
            componentArray[0].type == "config"
          ) {
            commit("setPageConfig", componentArray[0]);
          }
          dispatch("global/setLoading", false, { root: true });
        }
      );
    }
  },
  getters: {}
};
