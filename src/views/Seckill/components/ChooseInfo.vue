<template>
  <div class="choose-info">
    <div class="choose-info-item" @click="handleOpenSku">
      <div class="left">选择</div>
      <div class="right">{{ selectSkuStr }}</div>
    </div>
    <!-- <div class="choose-info-item" bind:tap="handleChooseAddress">
    <div class="left">送至</div>
    <div class="right">{{ selectAddressStr }}</div>
  </div>
  <div class="choose-info-item">
    <div class="left">运费</div>
    <div class="right">{{ freight }}</div>
  </div> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageSeckillGoodsDetail.goodsDetail,
      chooseInfo: state => state.pageSeckillGoodsDetail.chooseInfo
    }),
    selectSkuStr() {
      let {
        chooseInfo: { sku, selectSkuAttr, num }
      } = this;
      if (sku) {
        return selectSkuAttr
          .map(({ attrValue }) => attrValue)
          .concat(`${num}件`)
          .join("，");
      }
      return "请选择";
    },
    selectAddressStr() {
      let {
        chooseInfo: { address }
      } = this;
      if (address) {
        return (
          address.userAddressProvince +
          address.userAddressCity +
          address.userAddressDistrict +
          address.userAddressDetail
        );
      }
      return "请选择";
    },
    freight() {
      let {
        chooseInfo: { freight }
      } = this;
      if (freight) {
        return `¥${freight}`;
      } else {
        return "¥0.00";
      }
    }
  },
  methods: {
    ...mapMutations({
      setShowSku: "pageSeckillGoodsDetail/setShowSku",
      setBtnStatus: "pageSeckillGoodsDetail/setBtnStatus"
    }),
    handleOpenSku() {
      this.setBtnStatus(null);
      this.setShowSku(true);
    }
  }
};
</script>
<style lang="less" scoped>
.choose-info {
  width: 363px;
  background: white;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 8px;
  padding: 12px 6px;
  box-sizing: border-box;
  .choose-info-item {
    display: flex;
    font-size: 12px;
    line-height: 13px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .left {
      flex: 0 0 36px;
      color: #999999;
    }
    .right {
      flex: auto;
      color: #333;
    }
  }
}
</style>
