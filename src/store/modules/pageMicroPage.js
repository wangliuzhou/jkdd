/* eslint-disable no-unused-vars */
import { fetchGet } from "@/config/request";

export default {
  namespaced: true,
  state: {
    components: [],
    templateType: null
  },
  mutations: {
    setComponents(state, payload) {
      state.components = payload;
    },
    setTemplateType(state, payload) {
      state.templateType = payload;
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
          dispatch("global/setLoading", false, { root: true });
        }
      );
    }
  },
  getters: {}
};
