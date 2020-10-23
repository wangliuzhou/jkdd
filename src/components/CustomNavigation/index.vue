<template>
  <div class="custom-navigation">
    <div
      class="navigation-wrapper"
      :style="{
        'padding-top': `${statusBarHeight}px`,
        background: navBarStyle.bgColor
      }"
    >
      <div class="icon-group">
        <div class="icon-item" v-if="back && pageLength > 1">
          <IconFont
            type="iconleft"
            fontStyle="font-size:17px;color:#ffffff"
            @click="goBack"
          />
        </div>
        <div class="icon-item" v-if="home && pageLength === 1">
          <IconFont
            type="iconshouye"
            fontStyle="font-size:17px;color:#ffffff"
            @click="goHome"
          />
        </div>
      </div>
      <div class="title-wrapper" :style="{ color: navBarStyle.textColor }">
        {{ title }}
      </div>
    </div>
    <div
      v-if="block"
      class="empty"
      :style="{ 'padding-top': `${statusBarHeight}px` }"
    ></div>
  </div>
</template>

<script>
import IconFont from "../IconFont";
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    home: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  components: { IconFont },
  data() {
    return {
      statusBarHeight: 20,
      pageLength: 1
    };
  },
  computed: {
    navBarStyle() {
      let { scrollTop } = this;
      let opacity = scrollTop / 100;
      opacity = opacity > 1 ? 1 : opacity;
      let num = 255 - 255 * opacity;
      return {
        bgColor: `rgba(255,255,255,${opacity})`,
        textColor: `rgb(${num},${num},${num})`
      };
    }
  },
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({ path: "/pages/index/index" });
    }
  }
};
</script>
<style lang="less" scoped>
/* components/navigation/navigation.wxss */
// 这里用px  因为右上角胶囊的大小是固定不变的
.navigation-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 45px;
  overflow: hidden;
  z-index: 999;

  .icon-group {
    margin-left: 15px;
    display: flex;
    align-items: center;
    width: 50px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;

    .icon-item {
      width: 50%;
    }
  }

  .title-wrapper {
    width: calc(100% - 130px);
    line-height: 45px;
    height: 45px;
    text-align: left;
    font-weight: 500;
    font-size: 16px;

    color: #ffffff;
    text-align: center;
  }
}

.empty {
  height: 45px;
  width: 100%;
}
</style>
