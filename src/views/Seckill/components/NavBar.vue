<template>
  <div ref="nav-bar" class="nav-bar" v-if="scrollTop > 0" :style="navBarStyle">
    <div
      class="nav-item"
      :class="{ active: activeIndex === 0 }"
      @click="handleClick(0)"
    >
      商品
      <span></span>
    </div>
    <div
      class="nav-item"
      :class="{ active: activeIndex === 1 }"
      @click="handleClick(1)"
    >
      详情
      <span></span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    ...mapState({
      scrollTop: state => state.pageSeckillGoodsDetail.scrollTop
    }),
    navBarStyle() {
      let { scrollTop } = this;
      let opacity = scrollTop / 100;
      opacity = opacity > 1 ? 1 : opacity;
      return `opacity: ${opacity}`;
    }
  },
  mounted() {
    window.addEventListener(
      "scroll",
      () => {
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop || 0;
        this.setScrollTop(scrollTop);

        this.handleScrollChangeNavBar();
      },
      false
    );
  },
  methods: {
    ...mapMutations({
      setScrollTop: "pageSeckillGoodsDetail/setScrollTop"
    }),
    handleScrollChangeNavBar() {
      if (this.scrollTo.running) return;
      let index = 0;
      let oGoodsDetailRect = document
        .querySelector(".goods-detail")
        .getBoundingClientRect();
      let oNavBarHeight = this.$refs["nav-bar"]
        ? this.$refs["nav-bar"].offsetHeight
        : 0;
      if (oGoodsDetailRect.top - oNavBarHeight <= 0) {
        index = 1;
      }
      this.activeIndex = index;
    },
    handleClick(index) {
      this.activeIndex = index;

      if (index === 0) {
        this.scrollTo(0, 400);
      } else if (index === 1) {
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        let oGoodsDetailRect = document
          .querySelector(".goods-detail")
          .getBoundingClientRect();
        let oNavBarHeight = this.$refs["nav-bar"]
          ? this.$refs["nav-bar"].offsetHeight
          : 0;
        this.scrollTo(oGoodsDetailRect.top + scrollTop - oNavBarHeight, 400);
      }
      this.scrollTo.running = true;
    },
    scrollTo(number = 0, time) {
      if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
      }
      const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime; // 计算循环的次数
      let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
      let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--;
          this.scrollTo((nowTop += everTop));
        } else {
          this.scrollTo.running = false;
          clearInterval(scrollTimer); // 清除计时器
        }
      }, spacingTime);
    }
  }
};
</script>
<style lang="less" scoped>
.nav-bar {
  position: fixed;
  z-index: 10;
  background: white;
  left: 0;
  top: 0;
  width: 100%;
  height: 41px;
  padding-top: 5.5px;
  box-sizing: border-box;
  display: flex;
  opacity: 0;
  .nav-item {
    flex: 1;
    text-align: center;
    position: relative;
    font-size: 16px;
    span {
      width: 20px;
      height: 4px;
      background: #ff6a00;
      border-radius: 2px;
      position: absolute;
      bottom: 3.5px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
    }
    &.active {
      span {
        display: block;
      }
    }
  }
}
</style>
