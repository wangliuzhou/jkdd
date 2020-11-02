/* eslint-disable no-unused-vars */
import Cfg from "@/config/index";
import { fetchGet } from "@/config/request";

const defaultState = {
  dataIsLoad: false,
  scrollTop: 0,
  goodsDetail: null,
  chooseInfo: {
    sku: null, //已选中的sku信息
    selectSkuAttr: null, //选中的sku，map
    num: 1, //数量
    address: null, //选中的地址信息
    freight: 0 //运费
  },
  //1、加入购物车 2、立即购买
  btnStatus: null,
  //显示sku
  showSku: false
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    // resetData(state) {
    //   let cln = JSON.parse(JSON.stringify(defaultState));
    //   for (let key in cln) {
    //     state[key] = cln[key];
    //   }
    // },
    //显示sku面板
    setShowSku(state, payload) {
      state.showSku = payload;
    },
    setGoodsDetail(state, payload) {
      if (payload && payload.dealerProductJoinId) {
        state.goodsDetail = payload;
      } else {
        state.goodsDetail = null;
      }
    },
    setScrollTop(state, payload) {
      state.scrollTop = payload;
    },
    setDataIsLoad(state, payload) {
      state.dataIsLoad = payload;
    },
    setBtnStatus(state, payload) {
      state.btnStatus = payload;
    },
    updateChooseInfo(state, payload) {
      state.chooseInfo = { ...state.chooseInfo, ...payload };
    }
  },
  actions: {
    loadData({ state, commit, dispatch }, payload) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet("/mobile/tenantProduct/selectProductDetailById", {
        dealerProductOutId: payload,
        storeId: Cfg.mainStoreId
      })
        .then(({ data }) => {
          if (data && data.dealerProductJoinId) {
            document.title = data.productName;

            commit("setGoodsDetail", data);
          }
        })
        .catch(({ message }) => {})
        .then(() => {
          commit("setDataIsLoad", true);
          dispatch("global/setLoading", false, { root: true });
        });
    }
  },
  getters: {}
};
