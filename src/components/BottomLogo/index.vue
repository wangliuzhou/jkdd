<template>
  <div>
    <!-- 后台返回0 -->
    <div class="logo-box" v-if="logoInfo.storesysShowLogo === 0">
      <div class="dpxx">店铺信息</div>
      <img
        class="xxjd-image"
        style="margin-top:12rpx"
        :src="require('@/assets/images/bottomLogo/logo_bottom.png')"
        mode="widthFix"
      />
    </div>

    <!-- 后台返回1 -->
    <div class="logo-box" v-if="logoInfo.storesysShowLogo === 1">
      <div class="dpxx">店铺信息</div>
      <img
        class="xxjd-image"
        :src="logoInfo.storesysLogoUrl"
        mode="heightFix"
      />
      <div class="xz-info-box">
        <img
          class="xz-image"
          :src="require('@/assets/images/bottomLogo/logo_xz.png')"
          mode="widthFix"
        />
        <div class="xz-text">象征提供技术支持</div>
      </div>
    </div>

    <!-- 后台返回2 -->
    <div class="logo-box" v-if="logoInfo.storesysShowLogo === 2">
      <div class="dpxx">店铺信息</div>
      <img
        class="xxjd-image"
        :src="logoInfo.storesysLogoUrl"
        mode="heightFix"
      />
    </div>

    <!-- 后台返回3 -->
    <div class="logo-box" v-if="logoInfo.storesysShowLogo === 3">
      <div class="dpxx">店铺信息</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      logoInfo: state => state.bottomLogo.logoInfo
    })
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.logo-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #999;
  padding: 20px 0;

  .dpxx {
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #bdbdbd;
    letter-spacing: 1px;
    position: relative;
    &::before,
    &::after {
      content: "";
      width: 130px;
      border-top: 1px #bdbdbd dashed;
      display: inline-block;
      vertical-align: 20%;
    }
  }
  .dpxx:before {
    margin-right: 10px;
  }
  .dpxx:after {
    margin-left: 10px;
  }
  .xxjd-image {
    height: 20px;
    margin: 25px 0 11px 0;
  }
  .xz-info-box {
    display: flex;
    align-items: center;

    .xz-image {
      width: 16px;
      margin-right: 4px;
    }
    .xz-text {
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #bdbdbd;
      letter-spacing: 1px;
    }
  }
}
</style>
