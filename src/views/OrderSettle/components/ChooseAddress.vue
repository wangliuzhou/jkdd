<template>
  <div class="choose-address" @click="handleChooseAddress">
    <div class="left">
      <IconFont type="iconweizhi" fontStyle="font-size:25px;color:#666666;" />
    </div>
    <div class="center">
      <template v-if="addressInfo">
        <div class="userinfo">
          {{ addressInfo.userConsigneeName }}
          {{ addressInfo.userConsigneePhone }}
          <span class="default-tag" v-if="addressInfo.isDefault === 1"
            >默认</span
          >
        </div>
        <div class="addressinfo">
          {{ addressInfo.userAddressProvince }}{{ addressInfo.userAddressCity
          }}{{ addressInfo.userAddressDistrict
          }}{{ addressInfo.userAddressDetail }}
        </div>
      </template>
      <template v-if="!addressInfo">
        <div class="empty">请选择收货地址</div>
      </template>
    </div>
    <div class="right">
      <IconFont type="iconqianjin" fontStyle="font-size:15px;color:#CCCCCC;" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["addressInfo"],
  methods: {
    handleChooseAddress() {
      this.$push({
        path: `/addressList?redirectUrl=${encodeURIComponent(
          this.$route.fullPath
        )}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.choose-address {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ff6a00;
  background: white;
  .left {
    flex: 0 0 46px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center {
    flex: auto;
    font-size: 15px;
    .userinfo {
      color: #333333;
      display: flex;
      align-items: center;
      .default-tag {
        display: inline-block;
        padding: 0 4px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #ff6a00;
        border-radius: 8px;
        border: 0.5px solid #ff6a00;
        margin-left: 6px;
      }
    }
    .addressinfo {
      color: #666;
      margin-top: 16px;
    }
    .empty {
      color: #333;
    }
  }
  .right {
    flex: 0 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
