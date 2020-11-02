<template>
  <van-popup
    v-model="showSku"
    position="bottom"
    closeable
    :style="{ overflow: 'visible' }"
    @close="handleCloseSku"
  >
    <div class="goods-sku-wrap">
      <div class="goods-info">
        <div class="goods-img">
          <div
            class="img"
            :style="{ backgroundImage: `url(${$ali(goodsImg, 80)})` }"
            alt="单品图片"
          ></div>
        </div>
        <div>
          <div class="goods-price">¥{{ goodsPrice * 1 }}</div>
          <div class="goods-stock">库存{{ stock }}件</div>
        </div>
      </div>

      <template v-if="goodsDetail.isMultiAttr === 1">
        <div
          class="goods-sku"
          v-for="(attr, attrIndex) in propList"
          :key="attr.attrId"
        >
          <div class="goods-sku-title">{{ attr.attrName }}</div>
          <div class="goods-sku-item-list">
            <button
              class="goods-sku-item"
              :class="{
                active:
                  chooseInfo.selectSkuAttr &&
                  chooseInfo.selectSkuAttr[attrIndex].attrValueId ===
                    item.attrValueId
              }"
              v-for="item in attr.attrValueList"
              :key="item.attrValueId"
              @click="handleSkuItemClick({ item, attr })"
              :disabled="
                !hasStock(
                  skuList,
                  chooseInfo.selectSkuAttr,
                  attr,
                  item,
                  attrIndex
                )
              "
            >
              {{ item.attrValue }}
            </button>
          </div>
        </div>
      </template>

      <div class="goods-number-box">
        <div class="goods-number-text">购买数量</div>
        <div class="count-btns">
          <button
            class="reduce"
            :disabled="chooseInfo.num == 1"
            @click="handleChangeNum('reduce')"
          ></button>
          <div class="number">{{ chooseInfo.num }}</div>
          <button
            class="add"
            :disabled="stock <= chooseInfo.num"
            @click="handleChangeNum('add')"
          ></button>
        </div>
      </div>

      <div class="bottom-btn-box">
        <button class="bottom-btn" @click="handleConfirm">
          {{ btnStatus === 1 ? "加入购物车" : "确定" }}
        </button>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 1==>添加购物车  2==>确定去购买
    btnStatus: {
      type: Number,
      value: 1
    },
    goodsDetail: Object,
    chooseInfo: Object
  },
  computed: {
    showSku: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      }
    },
    goodsImg() {
      let {
        goodsDetail: { mainCover },
        chooseInfo: { selectSkuAttr }
      } = this;
      if (selectSkuAttr) {
        for (let i = 0, len = selectSkuAttr.length; i < len; i++) {
          if (selectSkuAttr[i].picUrl) return selectSkuAttr[i].picUrl;
        }
      }
      return mainCover ? mainCover.split(",")[0] : "";
    },
    //商品价格
    goodsPrice() {
      let {
        goodsDetail: { minPrice },
        chooseInfo: { sku }
      } = this;
      if (sku && sku.secKillPrice) {
        return sku.secKillPrice;
      }
      return minPrice;
    },
    propList() {
      let {
        goodsDetail: { voList }
      } = this;
      return voList || [];
    },
    skuList() {
      let {
        goodsDetail: { valueVoList }
      } = this;
      return valueVoList || [];
    },
    stock() {
      let {
        goodsDetail: { secKillStock },
        chooseInfo: { sku }
      } = this;
      if (sku) {
        return sku.secKillStock || 0;
      }
      return secKillStock || 0;
    }
  },
  methods: {
    hasStock(skuList, selectSkuAttr, attr, item) {
      let hasStock = false;
      for (let i = 0; i < skuList.length; i++) {
        let flag = true;
        let skuItem = skuList[i];
        if (
          ("," + skuItem.attrValueId + ",").indexOf(
            "," + item.attrValueId + ","
          ) > -1
        ) {
          if (selectSkuAttr) {
            for (let j = 0; j < selectSkuAttr.length; j++) {
              let selectItem = selectSkuAttr[j];
              if (selectItem.attrId !== attr.attrId && selectItem.attrValueId) {
                if (
                  ("," + skuItem.attrValueId + ",").indexOf(
                    "," + selectItem.attrValueId + ","
                  ) === -1
                ) {
                  flag = false;
                  break;
                }
              }
            }
          }
          if (flag) {
            if (skuItem.secKillStock > 0) {
              hasStock = true;
              break;
            }
          }
        }
      }
      return hasStock;
    },
    handleSkuItemClick({ item, attr }) {
      let { attrValueId, attrValue, picUrl } = item,
        { attrId } = attr;

      let {
        skuList,
        propList,
        chooseInfo,
        chooseInfo: { selectSkuAttr, num }
      } = this;
      //selectSkuAttr: [{attrId:1,attrName:'颜色',attrValueId:1,attrValue:'红色'}]
      if (!selectSkuAttr) {
        selectSkuAttr = propList.map(({ attrId, attrName }) => {
          return {
            attrId,
            attrName,
            attrValueId: null,
            attrValue: null,
            picUrl: ""
          };
        });
      }

      for (let i = 0, len = selectSkuAttr.length; i < len; i++) {
        let selectItem = selectSkuAttr[i];
        if (attrId == selectItem.attrId) {
          if (selectItem.attrValueId == attrValueId) {
            selectItem.attrValueId = null;
            selectItem.attrValue = null;
            selectItem.picUrl = "";
          } else {
            selectItem.attrValueId = attrValueId;
            selectItem.attrValue = attrValue;
            selectItem.picUrl = picUrl;
          }
          break;
        }
      }

      let sku = null;

      let selectAttrValueIds = selectSkuAttr
        .map(({ attrValueId }) => attrValueId)
        .filter(it => !!it)
        .sort((a, b) => a - b)
        .join();

      for (let i = 0; i < skuList.length; i++) {
        let skuItem = skuList[i];

        let attrValueIds = String(skuItem.attrValueId)
          .split(",")
          .filter(it => !!it)
          .sort((a, b) => a - b)
          .join();

        //判断选中的sku和当前循环的sku是否匹配
        if (attrValueIds === selectAttrValueIds) {
          sku = skuItem;
          break;
        }
      }

      if (sku && num > sku.secKillStock) {
        num = sku.secKillStock;
      }

      this.$emit("updateChooseInfo", {
        ...chooseInfo,
        selectSkuAttr,
        sku,
        num
      });
    },
    handleChangeNum(type) {
      let {
        chooseInfo,
        chooseInfo: { num }
      } = this;

      if (type === "reduce" && num > 1) {
        num--;
      }

      if (type === "add" && num < this.stock) {
        num++;
      }

      this.$emit("updateChooseInfo", {
        ...chooseInfo,
        num
      });
    },
    handleCloseSku() {
      this.$emit("closeSku");
    },
    handleConfirm() {
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="less" scoped>
.goods-sku-wrap {
  background: white;
  padding: 75px 24px 12px 24px;
  border-radius: 8px;
  .goods-info {
    position: absolute;
    top: -20px;
    left: 24px;
    display: flex;
    align-items: flex-end;

    .goods-img {
      width: 80px;
      height: 80px;
      margin-right: 15px;
      background: #dfe1e5;
      border-radius: 8px;
      overflow: hidden;
      .img {
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
    }
    .goods-price {
      color: white;
      font-size: 18px;
      line-height: 1;
      margin-top: 18.5px;
      color: #ff6a00;
    }
    .goods-stock {
      font-size: 12px;
      color: #999999;
      line-height: 18px;
      margin-top: 10px;
    }
  }
  .goods-sku {
    margin-top: 2px;
    .goods-sku-title {
      font-size: 13px;
      line-height: 18.5px;
      color: #999;
      text-align: left;
      margin-bottom: 18.5px;
    }
    .goods-sku-item-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
      .goods-sku-item {
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        font-size: 13px;
        padding: 0 17px;
        margin: 0 16px 16px 0;
        color: #333;
        border: 1px solid #f8f8f8;
        background: #f8f8f8;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;

        &.active {
          color: #ff6a00;
          border: 1px solid #ff6a00;
          background: #ffe9d9;
        }
        &[disabled] {
          color: #cccccc;
          border: 1px solid #f2f2f2;
          background: #f2f2f2;
        }
        &:after {
          border: none;
        }
      }
    }
  }

  .goods-number-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    .goods-number-text {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .count-btns {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
        flex: 0 0 29px;
        height: 29px;
        padding: 0;
        margin: 0;
        background: #f8f8f8;
        position: relative;
        border-radius: 10px;
        border: none;

        &::after {
          border: none;
        }
        &[disabled] {
          &.reduce {
            &::before {
              background: #ccc;
            }
          }
        }
      }
      .reduce {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 10px;
          height: 2px;
          background: #333333;
          border-radius: 1px;
        }
      }
      .number {
        flex: 0 0 69px;
        text-align: center;
      }
      .add {
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 10px;
          height: 2px;
          background: #333333;
          border-radius: 1px;
        }
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 2px;
          height: 10px;
          background: #333333;
          border-radius: 1px;
        }
      }
    }
  }

  .bottom-btn-box {
    display: flex;
    align-items: center;
    .bottom-btn {
      background: #ff6a00;
      width: 351px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      font-size: 15px;
      margin: 33px auto 0px auto;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
