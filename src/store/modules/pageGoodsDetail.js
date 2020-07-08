/* eslint-disable no-unused-vars */
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
    resetData(state) {
      let cln = JSON.parse(JSON.stringify(defaultState));
      for (let key in cln) {
        state[key] = cln[key];
      }
    }
  },
  actions: {
    loadData({ state, commit, dispatch }, payload) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet("/mobile/tenantProduct/selectProductDetailById", {
        dealerProductOutId: payload,
        storeId: "TSRORVZ17ZXD9"
      })
        .then(({ data }) => {
          if (data && data.dealerProductJoinId) {
            data.mainCover =
              "https://saasoss.xzintl.com/4zdolwl1nr/2020/07/07/file_d66nlnzke33zg-w828_h6184.jpg,https://saasoss.xzintl.com/4zdolwl1nr/2020/07/07/file_xeezyzg379w28-w828_h2126.jpg";
            state.goodsDetail = data;
          } else {
            state.goodsDetail = null;
          }
        })
        .catch(({ message }) => {})
        .then(() => {
          state.dataIsLoad = true;
          dispatch("global/setLoading", false, { root: true });
        });
    }
  },
  getters: {}
};
