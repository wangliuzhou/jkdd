<template>
  <div class="coupons-page">
    <tab-comp :tabIndex="tabIndex" @handleToggleTabs="handleToggleTabs">
      <template v-slot:canUse>
        <div class="coupons-list" v-if="list.length">
          <van-list
            offset="50"
            v-model="loading"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :finished="finished"
            finished-text="暂无更多数据"
            @load="getCouponsList"
            :immediate-check="false"
          >
            <div v-for="item in list" :key="item.userCouponOuterId">
              <coupon-item
                :item="item"
                :invalid="0"
                @onChooseCoupon="onChooseCoupon"
                style="width:100%"
              />
            </div>
          </van-list>
        </div>
      </template>
      <template v-slot:invalid>
        <div class="coupons-list" v-if="list.length">
          <van-list
            offset="50"
            v-model="loading"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :finished="finished"
            finished-text="暂无更多数据"
            @load="getCouponsList"
            :immediate-check="false"
          >
            <div v-for="item in list" :key="item.userCouponOuterId">
              <coupon-item
                :item="item"
                :invalid="1"
                @onChooseCoupon="onChooseCoupon"
                style="width:100%"
              />
            </div>
          </van-list>
        </div>
      </template>
    </tab-comp>
    <no-coupon :list="list" :loading="loading" />
    <loading-box :loading="loading" />
    <c-modal />
  </div>
</template>

<script>
import { formatTimeSimple } from "@/utils/index";
import CModal from "./components/CModal";
import CouponItem from "@/components/CouponItem";
import TabComp from "./components/TabComp";
import NoCoupon from "./components/NoCoupon";
import LoadingBox from "./components/LoadingBox";
export default {
  components: { CModal, CouponItem, TabComp, NoCoupon, LoadingBox },
  data() {
    return {
      list: [],
      tabIndex: 0,
      currentPage: 1,
      pages: 2,

      loading: false,
      finished: false,
      error: false
    };
  },
  computed: {},
  created() {
    this.getCouponsList();
  },
  methods: {
    /**
     * 请求列表数据
     */
    getCouponsList() {
      const { tabIndex, currentPage } = this;
      if (currentPage === 1) {
        this.list = []; //避免正常的优惠券展示成失效样式，先清空
      }
      this.$fetchGet("/apply/mobile/tenantMarketingCoupon/findCoupon", {
        isValid: tabIndex, // 0生效 1失效
        currentPage: currentPage,
        pageSize: 10
      })
        .then(({ data: { pages, records } }) => {
          if (tabIndex === this.tabIndex) {
            records.forEach(item => {
              item.startTimeCh = formatTimeSimple(item.marketingCouponStart);
              item.endTimeCh = formatTimeSimple(item.marketingCouponEnd);
            });
            if (currentPage === 1) {
              this.list = records;
            } else {
              this.list = this.list.concat(records);
            }
            this.pages = pages;
            this.loading = false;
            // 数据全部加载完成
            if (this.pages <= this.currentPage) {
              this.finished = true;
            }
            this.currentPage += 1;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    handleToggleTabs(e) {
      this.tabIndex = e;
      this.currentPage = 1;
      this.pages = 2;
      this.finished = false;
      this.getCouponsList();
    },
    onChooseCoupon() {}
  }
};
</script>
<style lang="less" scoped>
.coupons-page {
  background: rgba(248, 248, 248, 1);
  // padding-bottom: calc(env(safe-area-inset-bottom) + 57px);
  padding-bottom: calc(env(safe-area-inset-bottom));
  .tab-class {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .tab-active-class {
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 94, 0, 1);
  }
  .coupons-list {
    box-sizing: border-box;
    padding: 10px 12px;
    width: 100%;
  }
}
</style>
