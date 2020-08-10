<template>
  <div
    class="goodsList-container-wrap"
    :style="{ 'background-color': detail.backgroundColor, padding: calcMargin }"
  >
    <div class="goodsList-container">
      <div
        v-for="item of detail.goodsList"
        :key="item.marketingSeckillOuterId"
        @click="goPage(item)"
        class="goodsList-item-card"
        :class="calcCardStyle"
        :style="{
          'border-radius': calcBorderRadius,
          width: calcWidth,
          margin: calcCardMargin
        }"
      >
        <div
          class="goodsList-item-cover-box"
          :style="{ 'padding-top': detail.imageRatio }"
        >
          <van-image
            :src="$ali(item.mainCover, 375)"
            class="goodsList-item-cover-img"
            :fit="calcImageStyle"
          />
          <Countdown
            v-if="detail.isShowCountdown"
            :endTime="item.marketingSeckillEnd"
          />
          <van-image
            v-if="detail.tag.type === 1 && detail.tag.show"
            class="goodsList-item-tag-img"
            fit="cover"
            :src="$ali(detail.tag.img, 100)"
          />
          <div
            v-if="detail.tag.type === 2 && detail.tag.show"
            class="goodsList-item-tag"
          >
            {{ detail.tag.name }}
          </div>
        </div>
        <div class="goodsList-item-detail-box">
          <div v-if="detail.isShowGoodsName" class="goodsList-item-title-box">
            <div class="seckill-tag">{{ item.marketingSeckillLabel }}</div>
            <div class="goodsList-item-title">
              {{ item.dealerProductName || "无标题" }}
            </div>
          </div>
          <div
            v-if="detail.isShowGoodsDescribe"
            class="goodsList-item-describe-box"
          >
            {{ item.sellingPoint || "无描述" }}
          </div>
          <div class="goodsList-item-price-box">
            <div
              class="goodsList-item-sale-price"
              v-if="detail.isShowGoodsPrice"
            >
              ¥{{ item.seckillPrice }}
            </div>
            <div
              class="goodsList-item-original-price"
              v-if="detail.isShowGoodsOriginalPrice"
            >
              ¥{{ item.minDelPrice }}
            </div>
          </div>
          <div class="goodsList-item-sale-box">
            <div class="goodsList-item-sale">
              {{
                detail.isShowGoodsNum ? "仅剩" + item.seckillStock + "件" : ""
              }}
            </div>
            <div v-if="detail.buy.show" class="xz-goods__buy-box">
              <IconFont
                v-if="detail.buy.type == 1"
                type="iconicon-jiagouwudai"
                class="xz-goods__icon-btn"
              ></IconFont>
              <div v-if="detail.buy.type == 2" class="xz-goods__buy-btn">
                {{ detail.buy.name }}
              </div>
              <van-image
                v-if="detail.buy.type == 3"
                class="xz-goods__img-btn"
                fit="cover"
                :src="$ali(detail.buy.img, 100)"
              />
            </div>
          </div>
        </div>
      </div>
      <div :style="{ width: calcWidth }" :key="-99"></div>
    </div>
  </div>
</template>
<script>
import { px2rem } from "@/utils/index";
import Countdown from "./countdown";
export default {
  components: {
    Countdown
  },
  props: ["detail"],
  data: () => {
    return {};
  },
  computed: {
    calcMargin() {
      let { detail } = this;
      if (detail) {
        return px2rem(detail.marginNumber);
      }
      return "";
    },
    calcCardStyle() {
      let { detail } = this;
      if (detail) {
        if (detail.goodsStyle === 2) {
          return "card-shadow";
        }
        if (detail.goodsStyle === 3) {
          return "card-border";
        }
        if (detail.goodsStyle === 4) {
          return "card-simple";
        }
      }
      return "";
    },
    calcBorderRadius() {
      let { detail } = this;
      if (detail) {
        // 旧版的值是个数字, 做下兼容,如果是旧版的值转换成数组
        let value = [];
        if (typeof detail.radiusNumber === "number") {
          value = [
            detail.radiusNumber,
            detail.radiusNumber,
            detail.radiusNumber,
            detail.radiusNumber
          ];
        } else {
          value = [...detail.radiusNumber];
        }
        let style = [
          px2rem(value[0]),
          px2rem(value[1]),
          px2rem(value[3]),
          px2rem(value[2])
        ];
        return style.join(" ");
      }
      return "";
    },
    calcWidth() {
      let { detail } = this;
      if (detail) {
        return `calc(33.33% - ${px2rem(detail.spacingNumber / 2)})`;
      }
      return 0;
    },
    calcImageStyle() {
      let { detail } = this;
      if (detail) {
        return detail.fillType === 1 ? "cover" : "contain";
      }
      return "cover";
    },
    calcCardMargin() {
      let { detail } = this;
      if (detail) {
        return `0 0 ${px2rem(detail.spacingNumber)} 0`;
      }
      return "";
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
.goodsList-container-wrap {
  width: 100%;
  box-sizing: border-box;

  .goodsList-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;

    .goodsList-item-card {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      overflow: hidden;

      .goodsList-item-cover-box {
        position: relative;
        width: 100%;

        .goodsList-item-cover-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: auto;
          height: auto;
        }

        .goodsList-item-tag {
          position: absolute;
          top: 0;
          right: 15px;
          width: 28px;
          height: 28px;
          background: rgba(255, 106, 0, 1);
          border-radius: 0px 0px 8px 8px;
          font-size: 11px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 28px;
        }

        .goodsList-item-tag-img {
          position: absolute;
          top: 0;
          right: 15px;
          width: 28px;
          height: 28px;
        }
      }

      .goodsList-item-detail-box {
        box-sizing: border-box;
        padding: 8px 12px;

        .goodsList-item-title-box {
          display: flex;
          align-items: center;
          .goodsList-item-title {
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }

          .seckill-tag {
            display: inline-block;
            padding: 0 3px;
            height: 15px;
            background: rgba(255, 233, 217, 1);
            border-radius: 2px;
            font-size: 11px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 106, 0, 1);
            line-height: 15px;
            text-align: center;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }
        }

        .goodsList-item-describe-box {
          margin-top: 2px;
          height: 12px;
          color: #999;
          font-size: 12px;
          line-height: 12px;
          word-break: break-all;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .goodsList-item-price-box {
          margin-top: 2px;

          .goodsList-item-sale-price {
            height: 18px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 106, 0, 1);
            line-height: 18px;
          }

          .goodsList-item-original-price {
            height: 13px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 13px;
            text-decoration: line-through;
          }
        }

        .goodsList-item-sale-box {
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .goodsList-item-sale {
            height: 19px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 106, 0, 1);
            line-height: 19px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }

          .xz-goods__buy-box {
            cursor: pointer;
            height: 24px;

            .xz-goods__icon-btn {
              line-height: 24px;
              font-size: 22px;
              color: rgba(255, 106, 0, 1);
            }

            .xz-goods__img-btn {
              width: 24px;
              height: 24px;
            }

            .xz-goods__buy-btn {
              padding: 0 8px;
              height: 24px;
              background: rgba(255, 106, 0, 1);
              border-radius: 12px;
              text-align: center;
              line-height: 24px;
              color: #ffffff;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-break: break-all;
            }
          }
        }
      }

      &.card-shadow {
        box-shadow: 0 2px 14px rgba(0, 0, 0, 0.1);
      }

      &.card-border {
        border: 1px solid #e5e5e5;
      }

      &.card-simple {
        background-color: inherit;
      }
    }
  }

  &.goodsList-container-wrap-x {
    // height: auto;

    .goodsList-container {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;

      .goodsList-item-card {
        white-space: nowrap;
        flex-shrink: 0;
      }
    }
  }
}
</style>
