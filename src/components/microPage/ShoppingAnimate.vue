<template>
  <view class="animate-box" :style="{ top: style.top, left: style.left }">
    <IconFont
      type="icongouwuche1"
      fontStyle="font-size:20px;color:#ff6a00;"
    ></IconFont>
  </view>
</template>

<script>
import IconFont from "../IconFont";
import { BezierLines } from "../../utils/bezier";
export default {
  components: { IconFont },
  data() {
    return {
      lock: false,
      systemInfo: {},
      style: { left: "-999px", top: "-999px" }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let systemInfo = {
        windowWidth: 750,
        windowHeight: 1180
      };
      this.busPos = {
        x: systemInfo.windowWidth * 0.6,
        y: systemInfo.windowHeight - 48
      };
      // const tabbar = this.getTabBar();
      // if (tabbar) {
      //   var list = tabbar.data.list;
      // }
      // if (list && list.length > 0) {
      //   list.forEach((d, i) => {
      //     if (d.text === "购物车") {
      //       this.busPos.x =
      //         (systemInfo.windowWidth / list.length) * i +
      //         (375 / list.length - 20) / 2;
      //     }
      //   });
      // }
    },
    start(e) {
      if (this.lock) {
        return;
      }
      this.lock = true;
      let current = {
        x: e.touches["0"].clientX,
        y: e.touches["0"].clientY - 50
      };
      let top = {
        x: current.x - 100,
        y: current.y - 100
      };
      if (current.x < this.busPos.x) {
        top.x = current.x + (this.busPos.x - current.x) / 2;
      } else {
        top.x = this.busPos.x + (current.x - this.busPos.x) / 2;
      }
      let index = 0;
      let total = 30;
      let keyframes = BezierLines.bezier([current, top, this.busPos], total);
      this.timer = setInterval(() => {
        if (index >= total) {
          this.style = { left: "-999px", top: "-999px" };
          this.lock = false;
          clearInterval(this.timer);
        }
        this.style = keyframes.bezier_points[index];
        index++;
      }, 15);
      // this.animate(".animate-box", keyframes.bezier_points, 100, () => {
      // 	this.clearAnimation(".animate-box");
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.animate-box {
  width: 60rpx;
  height: 60rpx;
  position: fixed;
  left: -9999px;
  top: -999px;
  overflow: hidden;
  z-index: 99;
  opacity: 1;
  text-align: center;
  line-height: 60rpx;
}
</style>
