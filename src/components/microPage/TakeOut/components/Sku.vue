<template>
  <van-popup
    v-model="showSku"
    :style="{
      overflow: 'visible',
      paddingBottom: '1.73rem',
      background: 'none'
    }"
    @close="handleCloseSku"
  >
    <div class="goods-sku-wrap">
      <div class="container">
        <div class="goods-info">
          <div class="goods-name">{{ goodsDetail.productName }}</div>
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
      </div>

      <div class="goods-selected-sku-info">{{ selectSkuStr }}</div>

      <div class="footer container">
        <div class="goods-price">
          <span class="text">总计</span>
          <span class="price-info">
            <span>¥</span>
            <span class="price">{{ goodsPrice * 1 }}</span>
          </span>
        </div>
        <div class="count-btns" v-if="chooseInfo.sku">
          <template v-if="chooseInfo.sku.selectCount > 0">
            <button
              class="reduce"
              @click.stop.prevent="handleChangeNum('reduce')"
            ></button>
            <div class="number">{{ chooseInfo.sku.selectCount }}</div>
            <button
              class="add"
              :disabled="stock <= chooseInfo.sku.selectCount"
              @click.stop.prevent="handleChangeNum('add')"
            ></button>
          </template>
        </div>
      </div>
      <div class="close" @click.stop.prevent="handleCloseSku"></div>
    </div>
  </van-popup>
</template>
<script>
import { throttle } from "@/utils/index";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
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
      if (sku && sku.retailPrice) {
        return sku.retailPrice;
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
    },
    selectSkuStr() {
      let {
        chooseInfo: { sku, selectSkuAttr }
      } = this;
      if (sku) {
        return (
          "已选规格：" +
          selectSkuAttr.map(({ attrValue }) => attrValue).join("、")
        );
      }
      return "请选择规格";
    }
  },
  created() {
    let {
      goodsDetail: { valueVoList: skus, voList: propList },
      chooseInfo
    } = this;

    let attrValueIdList = this.getSortSkuAttrValueIdList(propList);

    for (let i = 0; i < attrValueIdList.length; i++) {
      let attrValueIds = attrValueIdList[i];
      for (let j = 0; j < skus.length; j++) {
        let sku = skus[j];
        // 将sku的attrValueId从到大进行排序
        sku.attrValueId = sku.attrValueId
          .split(",")
          .sort((a, b) => a - b)
          .join(",");

        if (sku.attrValueId === attrValueIds) {
          return this.$emit("update-choose-info", {
            ...chooseInfo,
            sku,
            selectSkuAttr: this.genSelectSkuAttr(propList, sku)
          });
        }
      }
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

      if (sku && num > sku.availStock) {
        num = sku.availStock;
      }

      this.$emit("update-choose-info", {
        ...chooseInfo,
        selectSkuAttr,
        sku,
        num
      });
    },
    handleChangeNum: throttle(function(type) {
      let {
        chooseInfo,
        chooseInfo: { sku }
      } = this;

      if (!sku) return;

      // 当前sku，在购物车里面的数量
      let num = sku.selectCount;

      if (type === "reduce" && num > 1) {
        num--;
      }

      if (type === "add") {
        if (num < this.stock) {
          num++;
        } else {
          return;
        }
      }

      this.$emit("update-choose-info", {
        ...chooseInfo,
        sku: {
          ...chooseInfo.sku,
          selectCount: num
        }
      });

      // 加入购物车
      this.$emit("add-cart", {
        onlinestoreSingleProductOuterId: sku.singleProductOuterId,
        count: type === "reduce" ? -1 : 1
      });
    }),
    handleCloseSku() {
      this.$emit("close");
    },
    // 获取排序之后的所有sku的AttrValueId
    getSortSkuAttrValueIdList(propList) {
      let result = [];
      propList.forEach((prop, i) => {
        if (i == 0) {
          result = prop.attrValueList.map(attr => [attr.attrValueId]);
        } else {
          let empty = [];
          prop.attrValueList.forEach(attr => {
            result.forEach(_ => {
              empty.push([..._, attr.attrValueId]);
            });
          });
          result = empty;
        }
      });
      result = result.map(_ => _.sort((a, b) => a - b).join(","));
      return result;
    },
    attrInSku(attrValueId, sku) {
      return (
        ("," + sku.attrValueId + ",").indexOf("," + attrValueId + ",") > -1
      );
    },
    genSelectSkuAttr(propList, sku) {
      return propList.map(({ attrId, attrName, attrValueList }) => {
        let activeAttrValue;
        for (let i = 0; i < attrValueList.length; i++) {
          let { attrValueId } = attrValueList[i];
          if (this.attrInSku(attrValueId, sku)) {
            activeAttrValue = attrValueList[i];
            break;
          }
        }
        return {
          attrId,
          attrName,
          attrValueId: activeAttrValue.attrValueId,
          attrValue: activeAttrValue.attrValue,
          picUrl: activeAttrValue.picUrl
        };
      });
    }
  }
};
</script>
<style lang="less" scoped>
.goods-sku-wrap {
  background: white;
  padding-bottom: 5px;
  border-radius: 8px;
  width: 335px;
  box-sizing: border-box;
  position: relative;
  .container {
    padding: 0 20px;
  }
  .goods-info {
    .goods-name {
      font-size: 19px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #303133;
      line-height: 26.5px;
      padding-top: 12px;
      padding-bottom: 20px;
    }
  }
  .goods-sku {
    .goods-sku-title {
      font-size: 13px;
      line-height: 18.5px;
      color: #999;
      text-align: left;
      margin-bottom: 10px;
    }
    .goods-sku-item-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
      .goods-sku-item {
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        font-size: 13px;
        padding: 0 17px;
        margin: 0 16px 20px 0;
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

  .goods-selected-sku-info {
    height: 32px;
    line-height: 32px;
    background: #fafafa;
    font-size: 13px;
    color: #606266;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    text-indent: 20px;
  }

  .footer {
    display: flex;
    height: 53.5px;
    align-items: center;
    .goods-price {
      flex: 1;
      .text {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #303133;
      }
      .price-info {
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ff6a00;
        margin-left: 3.5px;
        span {
          font-size: 12px;
        }
        .price {
          font-size: 24px;
        }
      }
    }
    .count-btns {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .add,
      .reduce {
        flex: 0 0 28px;
        height: 28px;
        padding: 0;
        margin: 0;
        position: relative;
        border-radius: 10px;
        border: 1px solid #ff6a00;
        &::after {
          border: none;
        }
        &[disabled] {
          &.reduce,
          &.add {
            opacity: 0.7;
          }
        }
      }
      .reduce {
        background: white;
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 10px;
          height: 2px;
          background: #ff6a00;
          border-radius: 1px;
        }
      }
      .number {
        width: 39px;
        flex: 0 0 39px;
        text-align: center;
        font-size: 14px;
      }
      .add {
        background: #ff6a00;
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 10px;
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
          height: 10px;
          background: white;
          border-radius: 1px;
        }
      }
      .add-cart {
        background: #ff6a00;
        font-size: 13px;
        color: white;
        border-radius: 5px;
        height: 28px;
        line-height: 28px;
        width: 94px;
        flex: 0 0 94px;
        padding: 0;
        text-align: center;
        margin: 0;
        border: none;
      }
    }
  }
  .close {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid #d0d0d0;
    position: absolute;
    bottom: -65px;
    left: 50%;
    transform: translateX(-50%);
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform-origin: center center;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      width: 20px;
      height: 2px;
      background: #d0d0d0;
      border-radius: 1px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform-origin: center center;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      width: 2px;
      height: 20px;
      background: #d0d0d0;
      border-radius: 1px;
    }
  }
}
</style>
