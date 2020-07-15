<template>
  <div class="goods-sku-wrap">
    <div class="goods-img">
      <div
        class="img"
        :style="{ backgroundImage: `url(${goodsImg})` }"
        alt="单品图片"
      ></div>
    </div>

    <div class="goods-price">¥{{ goodsPrice }}</div>

    <div class="goods-stock">库存{{ stock }}件</div>

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

    <div class="goods-number">
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

    <button class="bottom-btn" @click="handleConfirm">确定</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageGoodsDetail.goodsDetail,
      chooseInfo: state => state.pageGoodsDetail.chooseInfo,
      btnStatus: state => state.pageGoodsDetail.btnStatus
    }),
    goodsImg() {
      let {
        goodsDetail: { mainCover },
        chooseInfo: { sku }
      } = this;
      if (sku && sku.picUrl) {
        return sku.picUrl;
      }
      return mainCover ? mainCover.split(",")[0] : "";
    },
    //商品价格
    goodsPrice() {
      let {
        goodsDetail: { minPrice },
        chooseInfo: { sku }
      } = this;
      if (sku && sku.stdPrice) {
        return sku.stdPrice;
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
        goodsDetail: { stockSum },
        chooseInfo: { sku }
      } = this;
      if (sku) {
        return sku.availStock || 0;
      }
      return stockSum || 0;
    }
  },
  methods: {
    ...mapMutations({
      setShowSku: "pageGoodsDetail/setShowSku",
      updateChooseInfo: "pageGoodsDetail/updateChooseInfo"
    }),
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
            if (skuItem.availStock > 0) {
              hasStock = true;
              break;
            }
          }
        }
      }
      return hasStock;
    },
    handleSkuItemClick({ item, attr }) {
      let { attrValueId, attrValue } = item,
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
          return { attrId, attrName, attrValueId: null, attrValue: null };
        });
      }

      for (let i = 0, len = selectSkuAttr.length; i < len; i++) {
        let selectItem = selectSkuAttr[i];
        if (attrId == selectItem.attrId) {
          if (selectItem.attrValueId == attrValueId) {
            selectItem.attrValueId = null;
            selectItem.attrValue = null;
          } else {
            selectItem.attrValueId = attrValueId;
            selectItem.attrValue = attrValue;
          }
          break;
        }
      }

      let sku = null;

      let selectAttrValueIds = selectSkuAttr
        .map(({ attrValueId }) => attrValueId)
        .filter(it => !!it)
        .sort((a, b) => (a > b ? 1 : -1))
        .join();

      for (let i = 0; i < skuList.length; i++) {
        let skuItem = skuList[i];

        let attrValueIds = String(skuItem.attrValueId)
          .split(",")
          .filter(it => !!it)
          .sort((a, b) => (a > b ? 1 : -1))
          .join();

        //判断选中的sku和当前循环的sku是否匹配
        if (attrValueIds === selectAttrValueIds) {
          sku = skuItem;
          break;
        }
      }

      if (sku && num > this.stock) {
        num = this.stock;
      }

      this.updateChooseInfo({
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

      this.updateChooseInfo({
        ...chooseInfo,
        num
      });
    },
    handleConfirm() {
      let {
        btnStatus,
        chooseInfo: { sku, num },
        goodsDetail: { isMultiAttr, valueVoList }
      } = this;
      //有sku
      if (isMultiAttr != 1) {
        sku = valueVoList[0];
      }

      if (!sku) {
        return Toast({ position: "bottom", message: "请选择商品规格" });
      }

      this.setShowSku(false);

      if (btnStatus == 1) {
        //加入购物车
      } else if (btnStatus == 2) {
        //立即购买
        this.$router.push({
          path: `/orderSettle?skuIds=${sku.singleProductOuterId}&skuNums=${num}`
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.goods-sku-wrap {
  padding-top: 20px;
  background: white;
  padding-bottom: 6px;
}
.goods-img {
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  border-radius: 8px;
  margin: 0 auto;
  text-align: center;
  .img {
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
}
.goods-price {
  color: white;
  font-size: 18px;
  line-height: 1;
  margin-top: 18.5px;
  text-align: center;
  color: #ff6a00;
}
.goods-stock {
  font-size: 12px;
  color: #999999;
  line-height: 18px;
  margin-top: 10px;
  text-align: center;
}
.goods-sku {
  margin-top: 18px;
  .goods-sku-title {
    font-size: 13px;
    line-height: 18.5px;
    color: #333333;
    text-align: center;
    margin-bottom: 18.5px;
  }
  .goods-sku-item-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .goods-sku-item {
      height: 30px;
      line-height: 30px;
      border-radius: 8px;
      padding: 0 17px;
      font-size: 13px;
      margin: 0 8px;
      color: #999999;
      border: 0.5px solid #c0c4cc;
      background: white;
      &.active {
        color: #ff6a00;
        border: 0.5px solid #ff6a00;
        background: #ffe9d9;
      }
      &[disabled] {
        color: #cccccc;
        border: 0.5px solid #f2f2f2;
        background: #f2f2f2;
      }
      &:after {
        border: none;
      }
    }
  }
}

.goods-number {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  button {
    flex: 0 0 28px;
    height: 28px;
    padding: 0;
    margin: 0;
    border-radius: 100%;
    background: #ff6a00;
    border: none;
    position: relative;
    &[disabled] {
      background: #ffe9d9;
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
      width: 12.5px;
      height: 2px;
      background: white;
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
      width: 12.5px;
      height: 2px;
      background: white;
      border-radius: 1px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 2px;
      height: 12.5px;
      background: white;
      border-radius: 1px;
    }
  }
}

.bottom-btn {
  background: #ff6a00;
  width: 351px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  border-radius: 20px;
  margin: 0 auto;
  color: white;
  font-size: 15px;
  margin-top: 33px;
  border: none;
  display: block;
}
</style>
