<template>
  <div class="xz-image-wrap">
    <div class="image-container-wrap">
      <div class="image-swiper-wrap" :style="calcPaddingY">
        <div class="image-swiper-content">
          <van-swipe>
            <van-swipe-item v-for="item in detail.imageList" :key="item.id">
              <swiper-item>
                <div class="image-swiper-item" style="padding:0">
                  <van-image
                    class="image-swiper-image"
                    :src="item.src"
                    fit="cover"
                    style="border-radius:10px"
                  />
                </div>
              </swiper-item>
            </van-swipe-item>
          </van-swipe>

          <!-- 指示器 -->
          <!-- <div wx:if="{{detail.indicatorTpye === 1}}" class="indicator-dots-1">
            <block wx:for="{{detail.imageList}}" wx:key="productOuterId">
              <div
                class="indicator-dots-1-item {{current === index && 'active-indicators'}}"
              ></div>
            </block>
          </div>
          <div wx:if="{{detail.indicatorTpye === 2}}" class="indicator-dots-2">
            <block wx:for="{{detail.imageList}}" wx:key="productOuterId">
              <div
                class="indicator-dots-2-item {{current === index && 'active-indicators'}}"
              ></div>
            </block>
          </div>
          <div wx:if="{{detail.indicatorTpye === 3}}" class="indicator-dots-3">
            <block wx:for="{{detail.imageList}}" wx:key="productOuterId">
              <div
                class="indicator-dots-3-item {{current === index && 'active-indicators'}}"
              ></div>
            </block>
          </div>
          <div wx:if="{{detail.indicatorTpye === 4}}" class="indicator-dots-4">
            <div class="indicator-dots-4-item">
              <text class="active-indicators">{{ current + 1 }}</text>
              <text>/ {{ detail.imageList.length }}</text>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { px2rem } from "@/utils/index";
export default {
  props: ["detail"],
  computed: {
    calcSwiperHeight() {
      let { detail } = this;
      if (detail) {
        return px2rem(750 * detail.ratio);
      }
      return px2rem(375);
    },
    calcImageStyle() {
      let { detail } = this;
      if (detail) {
        return detail.fillType === 1 ? "aspectFill" : "aspectFit";
      }
      return "aspectFill";
    },
    calcBorderRadius() {
      let { detail } = this;
      if (detail) {
        return px2rem(detail.borderRadius * 2);
      }
      return 0;
    },
    calcPaddingY() {
      let { detail } = this;
      if (detail) {
        return `margin:${px2rem(detail.paddingY * 2)} 0`;
      }
      return `margin: 0`;
    },
    calcPaddingX() {
      let { detail } = this;
      if (detail) {
        return px2rem(detail.paddingX * 2);
      }
      return 0;
    }
  },
  mounted() {
    console.log(this.detail);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.xz-image-swiper-wrap {
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
      }
    }

    .indicator-dots-1 {
      position: absolute;
      bottom: 20rpx;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: wrap;

      .indicator-dots-1-item {
        width: 12rpx;
        height: 12rpx;
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
      bottom: 20rpx;
      left: 50%;
      transform: translate(0; -50%);
      display: flex;
      flex-wrap: wrap;

      .indicator-dots-2-item {
        width: 22rpx;
        height: 8rpx;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6rpx;
        background-color: #ebedf0;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;

        &:not(:last-child) {
          margin-right: 6px;
        }

        &.active-indicators {
          background-color: #ffa600;
          width: 46rpx;
        }
      }
    }

    .indicator-dots-3 {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      display: flex;
      flex-wrap: wrap;

      .indicator-dots-3-item {
        width: 12rpx;
        height: 12rpx;
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
      bottom: 20rpx;
      right: 20rpx;
      height: 56rpx;
      min-width: 80rpx;
      padding: 0 10rpx;
      color: #fff;
      font-size: 24rpx;
      line-height: 56rpx;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 28rpx;
      text-align: center;

      .active-indicators {
        font-size: 32rpx;
        color: #ffa600;
        font-weight: 700;
        margin-right: 6rpx;
      }
    }
  }
}
</style>
