<template>
  <div
    class="goodsList-container-wrap"
    :style="{ 'background-color': detail.backgroundColor, padding: calcMargin }"
  >
    <div class="goodsList-container">
      <div
        v-for="(item, index) of detail.goodsList"
        :key="item.productOuterId"
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
          <div v-if="item.stockNum === 0" class="sold-out">已售罄</div>
          <van-image
            :src="$ali(item.mainCover, 375)"
            class="goodsList-item-cover-img"
            :fit="calcImageStyle"
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
          <div class="goodsList-item-title-box">
            <van-image
              class="icon"
              v-if="detail.titleTag && detail.titleTag.show"
              :src="$ali(detail.titleTag.img)"
              fit="contain"
            />
            <span>{{
              detail.isShowGoodsName ? item.dealerProductName : ""
            }}</span>
          </div>
          <!-- <div
            v-if="detail.isShowGoodsDescribe"
            class="goodsList-item-describe-box"
          >
            {{ item.sellingPoint || "无描述" }}
          </div> -->
          <div class="xz-goods__goods-label-box">
            <div
              v-for="(labelItem, labelIndex) in onlinestoreProductLabelName[
                index
              ]"
              class="label-item"
              :key="labelIndex"
            >
              {{ labelItem }}
            </div>
          </div>
          <div class="footer">
            <div
              v-if="detail.isShowGoodsPrice || detail.isShowGoodsOriginalPrice"
              class="goodsList-item-price-box"
            >
              <div
                class="goodsList-item-sale-price"
                v-if="detail.isShowGoodsPrice"
              >
                ¥{{ item.retailPrice }}
              </div>
              <div
                class="goodsList-item-original-price"
                v-if="detail.isShowGoodsOriginalPrice && item.delPrice"
              >
                ¥{{ item.delPrice }}
              </div>
            </div>
            <!-- <div
              v-if="detail.buy.show"
              class="xz-goods__buy-box"
              @click.stop="onBuy($event, item)"
            >
              <IconFont
                v-if="detail.buy.type === 1"
                type="iconjiagouwudai"
                class="xz-goods__icon-btn"
              ></IconFont>
              <div v-if="detail.buy.type === 2" class="xz-goods__buy-btn">
                {{ detail.buy.name }}
              </div>
              <van-image
                class="xz-goods__img-btn"
                v-if="detail.buy.type === 3"
                :src="$ali(detail.buy.img, 100)"
                fit="contain"
              />
            </div> -->
          </div>
        </div>
      </div>
      <div :style="{ width: calcWidth }" :key="-99"></div>
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
          px2rem(value[0]) + "px",
          px2rem(value[1]) + "px",
          px2rem(value[3]) + "px",
          px2rem(value[2]) + "px"
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
        return `0 ${px2rem(detail.spacingNumber)} 0 0`;
      }
      return "";
    },
    onlinestoreProductLabelName() {
      let { detail } = this;
      if (detail) {
        return detail.goodsList.map(d => {
          return d.onlinestoreProductLabelName
            ? d.onlinestoreProductLabelName.split(",")
            : [];
        });
      }
      return [];
    }
  },
  mounted() {
    console.log(this.detail);
  },
  methods: {
    goPage(e) {
      this.$emit("goPage", e);
    },
    onBuy(e, item) {
      this.$emit("onBuy", { e, item });
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
    justify-content: space-between;
    box-sizing: border-box;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;

    .goodsList-item-card {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      flex-shrink: 0;

      .goodsList-item-cover-box {
        position: relative;
        width: 100%;
        .sold-out {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 78px;
          height: 78px;
          background: #000000;
          opacity: 0.65;
          z-index: 2;
          border-radius: 50%;
          color: #ffffff;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 78px;
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
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
          top: 8px;
          right: 8px;
          width: 35px;
          height: 35px;
        }
      }
      .goodsList-item-detail-box {
        box-sizing: border-box;
        padding: 8px 12px;

        .goodsList-item-title-box {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          height: 40px;

          .icon {
            margin-right: 4px;
            height: 16px;
            vertical-align: middle;
          }
        }

        .goodsList-item-describe-box {
          margin-top: 8px;
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
        .xz-goods__goods-label-box {
          width: 100%;
          height: 15px;
          line-height: 15px;
          margin: 4px 0;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          color: #ff6a00;

          .label-item {
            display: inline-block;
            margin-right: 6px;
            height: 15px;
            line-height: 15px;
            background: #ffe9d9;
            border-radius: 2px;
            font-size: 11px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ff6a00;
            padding: 0 2px;
            overflow: hidden;
          }
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .goodsList-item-price-box {
            flex-grow: 1;
            width: 0;
            // margin-top: 4px;
            height: 25px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;

            .goodsList-item-sale-price {
              display: inline-block;
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(255, 106, 0, 1);
              line-height: 25px;
            }

            .goodsList-item-original-price {
              display: inline-block;
              margin-left: 9px;
              font-size: 13px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              // color: rgba(255, 106, 0, 1);
              line-height: 25px;
              text-decoration: line-through;
              color: #999;
            }
          }

          .xz-goods__buy-box {
            height: 25px;

            .xz-goods__icon-btn {
              line-height: 25px;
              font-size: 22px;
              color: rgba(255, 106, 0, 1);
            }

            .xz-goods__img-btn {
              width: 25px;
              height: 25px;
            }

            .xz-goods__buy-btn {
              padding: 0 8px;
              height: 25px;
              background: rgba(255, 106, 0, 1);
              border-radius: 12px;
              text-align: center;
              line-height: 25px;
              color: #ffffff;
              font-size: 12px;
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
}
</style>
