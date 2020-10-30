import Vue from "vue";
import Vuex from "vuex";

import global from "./modules/global";
import pageIndex from "./modules/pageIndex";
import pageMicroPage from "./modules/pageMicroPage";
import pageGoodsDetail from "./modules/pageGoodsDetail";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    axiosPromiseCancel: []
  },
  mutations: {},
  actions: {},
  modules: {
    global,
    pageIndex,
    pageMicroPage,
    pageGoodsDetail
  }
});
