<template>
  <div class="coupons-page">
    <div class="coupons-list">
      <block v-for="item in list" :key="item.userCouponOuterId">
        <!-- <CouponItem
          item="{{item}}"
          index="{{index}}"
          invalid="{{0}}"
          activeIndex="{{activeIndex}}"
          bind:handleClickCouponItem="handleClickCouponItem"
          style="width:100%"
        />-->
        555
      </block>
    </div>
    <div class="look-past-due" bind:tap="lookPastDue">查看失效优惠券>></div>
    <div class="footer-wrap iphone-bottom">
      <div class="exchange-btn" bind:tap="handleShowExchange">兑换优惠码</div>
    </div>
    <CModal id="c-modal" catch:touchmove="onCatchTouchMove" />
  </div>
</template>

<script>
import CModal from "./components/CModal";
// import CouponItem from "@/components/CouponItem";
import { formatTimeSimple } from "@/utils/util";
export default {
  components: { CModal },
  data() {
    return {
      list: [],
      currentPage: 1,
      showNoDataImg: false,
      pages: 1,
      activeIndex: -1
    };
  },
  created() {
    this.getCouponsList();
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
      this.$fetchGet(api, params)
        .then(({ data: { pages, records } }) => {
          this.setFetchList(pages, records);
        })
        .catch(() => {
          wx.showToast({ title: "请求出错啦", icon: "none" });
        });
    },
    //格式化出参，渲染页面
    setFetchList(pages, records) {
      records.forEach(item => {
        item.startTimeCh = formatTimeSimple(item.marketingCouponStart);
        item.endTimeCh = formatTimeSimple(item.marketingCouponEnd);
      });
      const arr = this.data.list.concat(records);
      if (arr.length === 0) {
        this.setData({ showNoDataImg: true });
      } else {
        this.setData({
          showNoDataImg: false,
          list: arr,
          pages
        });
      }
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
    padding: 20rpx 24rpx;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .look-past-due {
    text-align: center;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    line-height: 40rpx;
    margin-bottom: 40rpx;
  }

  .footer-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    padding: 20rpx 24rpx;

    .exchange-btn {
      width: 100%;
      height: 100%;
      border-radius: 49rpx;
      border: 1rpx solid rgba(255, 106, 0, 1);
      text-align: center;
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 106, 0, 1);
      line-height: 72rpx;
    }
  }
}
</style>
