<template>
  <div class="image-container-wrap">
    <div class="image-hot-area-wrap" :style="calcPaddingY">
      <div class="image-hot-area-list">
        <div
          class="image-hot-area-item"
          v-for="item in detail.imageList"
          :key="item.id"
          :style="{ 'margin-bottom': calcPaddingX }"
        >
          <van-image
            class="image-hot-area-image"
            :src="$ali(item.src, 375)"
            :style="{ 'border-radius': calcBorderRadius }"
            mode="contain"
          />
          <div class="area-list">
            <div
              v-for="areaItem in item.customLink"
              :key="areaItem.id"
              class="area-item"
              :style="{
                width: areaItem.width_percent + '%',
                height: areaItem.height_percent + '%',
                top: areaItem.top_percent + '%',
                left: areaItem.left_percent + '%'
              }"
              @click="goPage(areaItem)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { px2rem } from "@/utils/index";
export default {
  props: ["detail"],
  data: () => {
    return {};
  },
  computed: {
    calcSwiperHeight() {
      let { detail } = this;
      if (detail) {
        return `height:${px2rem(375 * detail.ratio)}`;
      }
      return `height:${px2rem(375)}`;
    },
    calcBorderRadius() {
      let { detail } = this;
      if (detail) {
        // 旧版的值是个数字, 做下兼容,如果是旧版的值转换成数组
        let value = [];
        if (typeof detail.borderRadius === "number") {
          value = [
            detail.borderRadius,
            detail.borderRadius,
            detail.borderRadius,
            detail.borderRadius
          ];
        } else {
          value = [...detail.borderRadius];
        }
        let style = [
          px2rem(value[0]) + "px",
          px2rem(value[1]) + "px",
          px2rem(value[3]) + "px",
          px2rem(value[2]) + "px"
        ];
        return style.join(" ");
      }
      return "";
    },
    calcPaddingY() {
      let { detail } = this;
      if (detail) {
        return `margin:${px2rem(detail.paddingY)} 0`;
      }
      return "";
    },
    calcPaddingX() {
      let { detail } = this;
      if (detail) {
        return `${px2rem(detail.paddingX)}`;
      }
      return 0;
    }
  },
  mounted() {
    console.log(this.detail);
  },
  methods: {
    goPage(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="less" scoped>
.image-container-wrap {
  width: 100%;
  background: #cdcdd123;
  overflow: hidden;

  .image-hot-area-wrap {
    width: 100%;
    box-sizing: border-box;

    .image-hot-area-list {
      overflow: hidden;

      .image-hot-area-item {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;

        .image-hot-area-image {
          width: 100%;
          overflow: hidden;
        }

        .area-list {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          .area-item {
            position: absolute;
            background: #9cb6ce9f;
          }
        }

        &:last-child {
          margin: 0 !important;
        }
      }
    }
  }
}
</style>
