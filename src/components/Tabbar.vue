<template>
  <van-tabbar
    class="tabbar"
    :value="selected"
    :inactive-color="color"
    :active-color="selectedColor"
    :safe-area-inset-bottom="true"
  >
    <van-tabbar-item
      v-for="(item, i) in list"
      :key="i"
      @click.native="goPage(item)"
    >
      <span>{{ item.text }}</span>
      <template #icon="props">
        <img
          :src="props.active ? item.selectedIconPath : item.iconPath"
          :alt="item.text"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
const list = [
  {
    pagePath: "/",
    iconPath: require("@/assets/images/tabbar/index.png"),
    selectedIconPath: require("@/assets/images/tabbar/index-selected.png"),
    text: "首页"
  },
  {
    pagePath: "/classify",
    iconPath: require("@/assets/images/tabbar/classify.png"),
    selectedIconPath: require("@/assets/images/tabbar/classify-selected.png"),
    text: "分类"
  },
  {
    pagePath: "/cart",
    iconPath: require("@/assets/images/tabbar/cart.png"),
    selectedIconPath: require("@/assets/images/tabbar/cart-selected.png"),
    text: "购物车"
  },
  {
    pagePath: "/userCenter",
    iconPath: require("@/assets/images/tabbar/user-center.png"),
    selectedIconPath: require("@/assets/images/tabbar/user-center-selected.png"),
    text: "我的"
  }
];

export default {
  data() {
    let { $route } = this;
    let selected = list.findIndex(item => {
      return item.pagePath === $route.path;
    });
    return {
      selected,
      color: "#333333",
      selectedColor: "#ff6a00",
      borderStyle: "white",
      list
    };
  },
  methods: {
    goPage(item) {
      this.$push({
        path: item.pagePath
      });
    }
  }
};
</script>
<style lang="less" scoped>
.tabbar {
  z-index: 90;
}
</style>
