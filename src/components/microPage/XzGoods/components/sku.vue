<template>
  <div class="goods-sku-wrap">
    <div class="goods-img">
      <van-image
        :src="$ali(goodsImg, 80)"
        class="goodsList-item-cover-img"
        fit="contain"
        @click="handlePreviewImage(goodsImg)"
      />
    </div>
    <div class="goods-price">¥{{ goodsPrice * 1 }}</div>
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
            :class="
              `goods-sku-item ${
                chooseInfo.selectSkuAttr[attrIndex].attrValueId ===
                item.attrValueId
                  ? 'active'
                  : ''
              }`
            "
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
export default {
  props: {
    goodsDetail: {
      type: Object,
      default: () => {}
    },
    chooseInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    //商品图片
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
    }
  },
  mounted() {},
  methods: {
    handleSkuItemClick(e) {
      let {
        item: { attrValueId, attrValue, picUrl },
        attr: { attrId }
      } = e;

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

      if (sku && num > this.data.stock) {
        num = this.data.stock;
      }

      this.$emit("update-choose-info", {
        ...chooseInfo,
        selectSkuAttr,
        sku,
        num
      });
    },
    handleChangeNum(e) {
      let { type } = e.currentTarget.dataset;
      let {
        chooseInfo,
        chooseInfo: { sku, num }
      } = this;

      if (type === "reduce" && num > 1) {
        num--;
      }

      if (type === "add" && num < this.data.stock) {
        num++;
      }

      this.$emit("update-choose-info", {
        ...chooseInfo,
        num
      });
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    handlePreviewImage(e) {
      wx.previewImage({
        current: e,
        urls: [e]
      });
    }
  }
};
</script>
