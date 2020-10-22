<template>
  <div class="coupons-page">
    <div v-if="showNoDataImg" style="text-align:center;padding-top:30vh">
      <IconFont
        type="iconzanwuyouhuiquan"
        fontStyle="font-size:40px;color:#ccc"
      />
    </div>
    <div class="coupons-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="getFinishedText"
        offset="100"
        @load="getCouponsList"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div
          v-for="(item, index) in list"
          :key="item.userCouponOuterId"
          style="width:100%"
        >
          <CouponItem
            :item="item"
            :index="index"
            :invalid="1"
            :active-index="activeIndex"
            @handleClickCouponItem="handleClickCouponItem"
            style="width:100%"
          />
        </div>
      </van-list>
    </div>
    <div style="height:60px"></div>
    <div class="footer-wrap iphone-bottom">
      <div class="exchange-btn" @click="handleToogleExchange">兑换优惠码</div>
    </div>
    <CModal
      :is-show.sync="isShow"
      @handleToogleExchange="handleToogleExchange"
    />
  </div>
</template>

<script>
import CModal from "./components/CModal";
import CouponItem from "@/components/CouponItem";
import { formatTimeSimple } from "@/utils/index";
import { Toast } from "vant";
export default {
  components: { CModal, CouponItem },
  data() {
    return {
      list: [],
      currentPage: 1,
      showNoDataImg: false,
      activeIndex: -1,
      isShow: false,
      loading: false,
      finished: false,
      error: false
    };
  },
  computed: {
    getFinishedText() {
      return this.list.length ? "没有更多数据" : "暂无优惠券";
    }
  },
  mounted() {},
  methods: {
    /**
     * 请求列表数据
     */
    getCouponsList() {
      const api = "/apply/mobile/tenantMarketingCoupon/findCoupon";
      const params = {
        isValid: 1, // 0生效 1失效
        currentPage: this.currentPage,
        pageSize: 10
      };
      this.loading = true;
      this.$fetchGet(api, params)
        .then(({ data: { pages, records } }) => {
          this.setFetchList(pages, records);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
          Toast("请求出错啦");
        });
    },
    //格式化出参，渲染页面
    setFetchList(pages, records) {
      records.forEach(item => {
        item.startTimeCh = formatTimeSimple(item.marketingCouponStart);
        item.endTimeCh = formatTimeSimple(item.marketingCouponEnd);
      });
      this.list = this.list.concat(records);
      this.loading = false;
      this.showNoDataImg = this.list.length === 0 ? true : false;
      if (pages <= this.currentPage) {
        this.finished = true;
      }
      this.currentPage += 1;
    },

    handleToogleExchange() {
      this.isShow = !this.isShow;
    },
    lookPastDue() {
      wx.navigateTo({ url: "/pages/coupons/invalidCoupons/index" });
    },
    handleClickCouponItem(index) {
      this.activeIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
page {
  background: #f8f8f8;
  padding-bottom: calc(env(safe-area-inset-bottom) + 57px);
}

.coupons-page {
  .coupons-list {
    box-sizing: border-box;
    padding: 10px 12px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 375px;
    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    padding: 10px 12px;

    .exchange-btn {
      width: 100%;
      height: 100%;
      border-radius: 25px;
      border: 1px solid rgba(255, 106, 0, 1);
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 106, 0, 1);
      line-height: 36px;
    }
  }
}
</style>
