<template>
  <div class="choose-coupon">
    <div class="right" @click="show = true">
      <span class="price">{{ text }}</span>
      <IconFont type="iconright" fontStyle="font-size:13px;" />
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      closeable
      @click-overlay="onClickOverlay"
    >
      <div class="coupons-page">
        <div class="tabs">
          <div
            class="tab"
            :class="{
              'tab-active-class': tabIndex === 0
            }"
            @click="handleClickTab(0)"
          >
            可用({{ useCoupons.length }})
          </div>
          <div
            class="tab"
            :class="{
              'tab-active-class': tabIndex === 1
            }"
            @click="handleClickTab(1)"
          >
            不可用({{ notUseCoupons.length }})
          </div>
        </div>
        <div class="coupons-list">
          <template v-for="item in [useCoupons, notUseCoupons][tabIndex]">
            <CouponItem
              :key="item.userCouponOuterId"
              :item="item"
              :choosedId="choosedId"
              :invalid="tabIndex"
              @handleChooseCoupon="handleChooseCoupon"
              style="width:100%"
            />
          </template>
        </div>

        <div class="confirm-box">
          <div
            class="confirm-btn actvie-confirm-btn"
            @click="handleConfirmChoose"
          >
            {{ choosedId ? "确定" : "不使用优惠券" }}
          </div>
        </div>
        <div v-if="getShowNoDataImg" class="no-coupon-box">
          <img
            class="no-coupon"
            :src="require('@/assets/images/no-coupon.png')"
            alt="暂无优惠券"
          />
          <div style="color:#ccc;">暂无优惠券哦~</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Cfg from "@/config/index";
import { formatTimeSimple } from "@/utils/util";
import CouponItem from "@/components/CouponItem/index";

export default {
  components: {
    CouponItem
  },
  props: {
    text: String,
    skuIds: String,
    skuNums: String,
    couponId: String
  },
  data() {
    let { couponId } = this;

    return {
      show: false,
      tabIndex: 0,
      useCoupons: [],
      notUseCoupons: [],
      showLoading: true,
      choosedId: couponId
    };
  },
  computed: {
    ...mapState({
      global: "global"
    }),
    getShowNoDataImg() {
      const { useCoupons, notUseCoupons, tabIndex } = this;
      return [useCoupons, notUseCoupons][tabIndex].length === 0;
    },
    skus() {
      let { skuIds, skuNums } = this;
      skuIds = skuIds.split(",");
      skuNums = skuNums.split(",");
      return skuIds.map((skuId, i) => {
        return {
          onlinestoreSingleProductOuterId: skuId,
          onlinestoreSingleProductCount: Number(skuNums[i])
        };
      });
    }
  },
  mounted() {
    this.getCouponsList();
  },
  methods: {
    ...mapActions({
      setLoading: "global/setLoading"
    }),
    onClickOverlay() {
      this.show = false;
    },
    /**
     * 请求列表数据
     */
    getCouponsList() {
      this.setLoading(true);
      this.$fetchPost("/apply/mobile/tenantMarketingCoupon/findUseCoupon", {
        storeOuterId: Cfg.mainStoreId,
        onlineStoreSingleProductOutIdLists: this.skus
      })
        .then(({ data }) => {
          this.setFetchList(data);
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    //格式化出参，渲染页面
    setFetchList(data) {
      data.notUseCoupons.forEach(item => {
        item.startTimeCh = formatTimeSimple(item.marketingCouponStart);
        item.endTimeCh = formatTimeSimple(item.marketingCouponEnd);
      });
      data.useCoupons.forEach(item => {
        item.startTimeCh = formatTimeSimple(item.marketingCouponStart);
        item.endTimeCh = formatTimeSimple(item.marketingCouponEnd);
      });
      this.useCoupons = data.useCoupons;
      this.notUseCoupons = data.notUseCoupons;
    },

    // 当点击优惠券
    handleChooseCoupon({ userCouponOuterId }) {
      const choosedId =
        userCouponOuterId === this.choosedId ? "" : userCouponOuterId;
      this.choosedId = choosedId;
    },
    handleClickTab(tabIndex) {
      if (tabIndex !== this.tabIndex) {
        this.tabIndex = tabIndex;
      }
    },
    handleConfirmChoose() {
      const { choosedId, useCoupons } = this;
      const couponInfo = useCoupons.find(
        i => i.userCouponOuterId === choosedId
      );
      this.$emit("handleChooseCoupon", choosedId || "");
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.right {
  color: #cccccc;
  .price {
    color: #ff6a00;
    margin-right: 5px;
  }
}
.coupons-page {
  height: 70vh;
  position: relative;
  background: #f8f8f8;
  background: red;
  padding-top: 50px;
  overflow: hidden;
  .no-coupon-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-coupon {
      width: 97px;
    }
  }
  .tabs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #f8f8f8;
    border-bottom: 1px solid #f9f9f9;
    display: flex;

    .tab {
      height: 100%;
      width: 167.5px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tab-active-class {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 94, 0, 1);
    }
  }
  .coupons-list {
    box-sizing: border-box;
    padding: 0px 12px 65px 12px;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    overflow-y: auto;
  }
}
.confirm-box {
  position: fixed;
  z-index: 88;
  bottom: calc(env(safe-area-inset-bottom));
  left: 0;
  box-sizing: border-box;
  padding: 0px 12px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  .confirm-btn {
    width: 351px;
    height: 36px;
    background: #cccccc;
    border-radius: 24.5px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    transition: all 0.3s ease-in-out;
  }
  .actvie-confirm-btn {
    background: #ff6a00;
    transition: all 0.3s ease-in-out;
  }
}
</style>
