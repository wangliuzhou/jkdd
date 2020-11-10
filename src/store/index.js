import Vue from "vue";
import Vuex from "vuex";

import global from "./modules/global";
import pageIndex from "./modules/pageIndex";
import bottomLogo from "./modules/bottomLogo";
import pageMicroPage from "./modules/pageMicroPage";
import pageGoodsDetail from "./modules/pageGoodsDetail";
import pageSeckillGoodsDetail from "./modules/pageSeckillGoodsDetail";

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
    bottomLogo,
    pageMicroPage,
    pageGoodsDetail,
    pageSeckillGoodsDetail
  }
});
