<template>
  <div class="image-container-wrap">
    <div class="image-swiper-wrap" :style="calcPaddingY">
      <div class="image-swiper-content">
        <van-swipe
          :style="calcSwiperHeight"
          :show-indicators="false"
          autoplay="5000"
          @change="onSwipeChange"
        >
          <van-swipe-item v-for="item in detail.imageList" :key="item.id">
            <div
              class="image-swiper-item"
              :style="{ padding: calcPaddingX }"
              @click="goPage(item)"
            >
              <van-image
                class="image-swiper-image"
                :src="$ali(item.src, 375)"
                :fit="calcImageStyle"
                :style="{ borderRadius: calcBorderRadius }"
              />
            </div>
          </van-swipe-item>
        </van-swipe>

        <!-- 指示器 -->
        <div v-if="detail.indicatorTpye === 1" class="indicator-dots-1">
          <div
            v-for="(item, index) in detail.imageList"
            :key="item.id"
            class="indicator-dots-1-item"
            :class="{ 'active-indicators': current === index }"
          ></div>
        </div>
        <div v-if="detail.indicatorTpye === 2" class="indicator-dots-2">
          <div
            v-for="(item, index) in detail.imageList"
            :key="item.id"
            class="indicator-dots-2-item"
            :class="{ 'active-indicators': current === index }"
          ></div>
        </div>
        <div v-if="detail.indicatorTpye === 3" class="indicator-dots-3">
          <div
            v-for="(item, index) in detail.imageList"
            :key="item.id"
            class="indicator-dots-3-item"
            :class="{ 'active-indicators': current === index }"
          ></div>
        </div>
        <div v-if="detail.indicatorTpye === 4" class="indicator-dots-4">
          <div class="indicator-dots-4-item">
            <span class="active-indicators">{{ current + 1 }}</span>
            <span>/ {{ detail.imageList.length }}</span>
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
    return {
      current: 0
    };
  },
  computed: {
    calcSwiperHeight() {
      let { detail } = this;
      if (detail) {
        return `height:${px2rem(375 * detail.ratio)}`;
      }
      return `height:${px2rem(375)}`;
    },
    calcImageStyle() {
      let { detail } = this;
      if (detail) {
        return detail.fillType === 1 ? "cover" : "contain";
      }
      return "cover";
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
        return `0 ${px2rem(detail.paddingX)}`;
      }
      return 0;
    }
  },
  mounted() {},
  methods: {
    onSwipeChange(e) {
      this.current = e;
    },
    goPage(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="less" scoped>
.image-swiper-wrap {
  width: 100%;

  .image-swiper-content {
    position: relative;
    width: 100%;

    .image-swiper-item {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      .image-swiper-image {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }

    .indicator-dots-1 {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: wrap;

      .indicator-dots-1-item {
        width: 6px;
        height: 6px;
        background-color: #ebedf0;
        border-radius: 100%;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;

        &:not(:last-child) {
          margin-right: 6px;
        }

        &.active-indicators {
          background-color: #ffa600;
        }
      }
    }

    .indicator-dots-2 {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: wrap;

      .indicator-dots-2-item {
        width: 11px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        background-color: #ebedf0;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;

        &:not(:last-child) {
          margin-right: 6px;
        }

        &.active-indicators {
          background-color: #ffa600;
          width: 23px;
        }
      }
    }

    .indicator-dots-3 {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: flex;
      flex-wrap: wrap;

      .indicator-dots-3-item {
        width: 6px;
        height: 6px;
        background-color: #ebedf0;
        border-radius: 100%;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;

        &:not(:last-child) {
          margin-right: 6px;
        }

        &.active-indicators {
          background-color: #ffa600;
        }
      }
    }

    .indicator-dots-4 {
      position: absolute;
      bottom: 10px;
      right: 10px;
      height: 28px;
      min-width: 40px;
      padding: 0 5px;
      color: #fff;
      font-size: 12px;
      line-height: 28px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 14px;
      text-align: center;

      .active-indicators {
        font-size: 16px;
        color: #ffa600;
        font-weight: 700;
        margin-right: 3px;
      }
    }
  }
}
</style>
