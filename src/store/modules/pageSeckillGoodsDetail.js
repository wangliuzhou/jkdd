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
  showSku: false,
  //活动状态 1、活动未开始 2、活动进行中 3、活动已结束
  activityInfo: {
    activityStatus: null,
    //倒计时
    remainingTime: 0
  }
};

let timer = null;

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
    },
    setActivityInfo(state, payload) {
      state.activityInfo = payload;
    }
  },
  actions: {
    loadData({ state, commit, dispatch }, { id, seckillOutId }) {
      dispatch("global/setLoading", true, { root: true });

      fetchGet("/mobile/tenantProduct/selectSecKillDealerDetail", {
        storeId: Cfg.mainStoreId,
        dealerProductOutId: id,
        activityId: seckillOutId
      })
        .then(({ data }) => {
          if (data && data.dealerProductJoinId) {
            document.title = data.productName;
            //秒杀价格
            data.secKillPrice = parseFloat(data.secKillPrice);

            commit("setGoodsDetail", data);

            dispatch("genActivityStatus", data);
          }
        })
        .catch(({ message }) => {})
        .then(() => {
          commit("setDataIsLoad", true);
          dispatch("global/setLoading", false, { root: true });
        });
    },
    genActivityStatus({ state, commit, dispatch }, goodsDetail) {
      let { systemTime, secKillStartTime, secKillEndTime } = goodsDetail;
      let activityStatus = null,
        remainingTime = 0;

      if (systemTime < secKillStartTime) {
        //活动未开始
        activityStatus = 1;
        remainingTime = secKillStartTime - systemTime;
      } else if (
        systemTime >= secKillStartTime &&
        systemTime <= secKillEndTime
      ) {
        //活动进行中
        activityStatus = 2;
        remainingTime = secKillEndTime - systemTime;
      } else {
        //活动已结束
        activityStatus = 3;
      }

      commit("setActivityInfo", {
        activityStatus,
        remainingTime
      });

      if (remainingTime > 0) {
        dispatch("countDown", remainingTime);
      }
    },
    countDown({ state, commit, dispatch }, payload) {
      //开始倒计时
      clearInterval(timer);
      timer = setInterval(() => {
        let {
          activityInfo: { remainingTime, activityStatus },
          goodsDetail: { secKillStartTime, secKillEndTime }
        } = state;
        remainingTime = remainingTime - 1000;
        if (remainingTime <= 0) {
          //倒计时结束
          remainingTime = 0;
          if (activityStatus == 1) {
            //活动改成开始状态，然后进行倒计时
            activityStatus = 2;
            remainingTime = secKillEndTime - secKillStartTime;
          } else if (activityStatus == 2) {
            //活动改成结束状态
            activityStatus = 3;
            clearInterval(timer);
          }
        }
        commit("setActivityInfo", {
          remainingTime,
          activityStatus
        });
      }, 1000);
    }
  },
  getters: {}
};
