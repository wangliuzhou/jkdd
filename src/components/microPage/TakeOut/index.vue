<template>
  <div class="take-out">
    <div
      class="take-out-content"
      :class="{
        'is-tab-page': isTabPage
      }"
      v-if="!noData"
    >
      <div class="take-out-content-left" ref="left">
        <div class="take-out-content-left-list">
          <div
            :ref="`tab_${item.fId}`"
            class="take-out-content-left-item"
            :class="{
              active: activeIndex === index,
              preActive: activeIndex - 1 === index,
              nextActive: activeIndex + 1 === index
            }"
            v-for="(item, index) in list"
            :key="item.fId"
            @click="setActiveIndex(item, index)"
          >
            <span class="name">{{ item.className }}</span>
            <span class="num" v-if="item.selectCount">{{
              item.selectCount
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="take-out-content-right"
        ref="right"
        @scroll="handleRightScroll"
      >
        <div class="take-out-content-right-content">
          <div class="take-out-content-right-goods-wrap">
            <div
              :ref="`goods_${classItem.fId}`"
              class="take-out-content-right-goods"
              v-for="(classItem, classIndex) in list"
              :key="classItem.fId"
            >
              <div
                class="take-out-content-right-banner"
                v-if="classItem.banner"
                :style="
                  'background-image: url(' + $ali(classItem.banner, 250) + ')'
                "
              ></div>
              <div class="take-out-content-right-goods-title">
                {{ classItem.className }}
              </div>
              <div class="take-out-content-right-goods-list">
                <div
                  class="take-out-content-right-goods-item"
                  v-for="(item, index) in classItem.productList"
                  :key="item.productInnerId"
                  @click="handleJump(item)"
                >
                  <div
                    class="image"
                    :style="
                      'background-image: url(' + $ali(item.mainCover, 80) + ')'
                    "
                  >
                    <div v-if="item.stockNum == 0" class="sold-out">
                      已售罄
                    </div>
                  </div>
                  <div class="info">
                    <div class="name">{{ item.productName }}</div>
                    <div class="desc" v-if="item.sellingPoint">
                      {{ item.sellingPoint }}
                    </div>
                    <div class="tags">
                      <span
                        v-for="item in splitLabel(
                          item.onlinestoreProductLabelName
                        )"
                        :key="item"
                        >{{ item }}</span
                      >
                    </div>
                    <div class="price-wrap">
                      <span class="sell-price">
                        <span>¥</span>
                        <span class="price">{{ item.minPrice * 1 }}</span>
                      </span>
                      <span class="del-price" v-if="item.minDelPrice * 1"
                        >¥{{ item.minDelPrice * 1 }}</span
                      >
                    </div>
                    <!-- 只有库存大于0的时候才显示 -->
                    <div class="btns" v-if="item.stockNum > 0">
                      <!-- 单sku -->
                      <template v-if="item.skuNum <= 1">
                        <div class="s-btns">
                          <template v-if="item.selectCount > 0">
                            <button
                              class="reduce"
                              @click.stop.prevent="
                                handleReduce({
                                  classItem,
                                  classIndex,
                                  item,
                                  index
                                })
                              "
                            >
                              -
                            </button>
                            <span>{{ item.selectCount }}</span>
                          </template>
                          <button
                            class="add"
                            :disabled="item.stockNum <= item.selectCount"
                            @click.stop.prevent="
                              handleAdd({
                                classItem,
                                classIndex,
                                item,
                                index
                              })
                            "
                          >
                            +
                          </button>
                        </div>
                      </template>
                      <!-- 多sku -->
                      <template v-if="item.skuNum > 1">
                        <div class="m-btns">
                          <button
                            class="select-sku"
                            @click.stop.prevent="
                              handleSelectSku({
                                classItem,
                                classIndex,
                                item,
                                index
                              })
                            "
                          >
                            选规格
                            <span v-if="item.selectCount">{{
                              item.selectCount
                            }}</span>
                          </button>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SkuBox
      :ref="`skuBox-${item.fId}`"
      :isTabPage="isTabPage"
      @handleSelectSkuCallback="handleSelectSkuCallback"
    />

    <EmptyTip v-if="noData" />
  </div>
</template>
<script>
import { Toast } from "vant";
import { getOffsetTop } from "@/utils/dom";
import EmptyTip from "./components/EmptyTip";
import SkuBox from "./components/SkuBox";

export default {
  components: { EmptyTip, SkuBox },
  props: {
    item: Object,
    isTabPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: 0,
      rightScrollIntoViewId: null,
      leftScrollTop: null
    };
  },
  computed: {
    list() {
      let { item } = this;
      return item ? item.classifyList : [];
    },
    noData() {
      let { list } = this;
      return !list || !list.length;
    }
  },
  methods: {
    splitLabel(label) {
      return label ? label.split(",") : [];
    },
    setActiveIndex(item, index) {
      this.activeIndex = index;
      let oRight = this.$refs["right"];
      let oClassify = this.$refs[`goods_${item.fId}`][0];
      oRight.scrollTop = getOffsetTop(oClassify) - getOffsetTop(oRight);
      //做个标记防止重复触发handleRightScroll
      this._scrolling = true;
      setTimeout(() => {
        this._scrolling = false;
      }, 400);
    },
    handleRightScroll() {
      if (this._scrolling) return;

      let oRight = this.$refs["right"];
      let { activeIndex } = this;
      for (let i = 0, len = this.list.length; i < len; i++) {
        let item = this.list[i];
        let oClassify = this.$refs[`goods_${item.fId}`][0];
        if (getOffsetTop(oClassify) - getOffsetTop(oRight) < oRight.scrollTop) {
          activeIndex = i;
        }
      }

      let oLeft = this.$refs["left"];
      let oTab = this.$refs[`tab_${this.list[activeIndex].fId}`][0];

      if (
        getOffsetTop(oTab) - getOffsetTop(oLeft) >
        oLeft.scrollTop + (oLeft.offsetHeight - oTab.offsetHeight)
      ) {
        oLeft.scrollTop =
          getOffsetTop(oTab) -
          getOffsetTop(oLeft) -
          (oLeft.offsetHeight - oTab.offsetHeight);
      } else if (getOffsetTop(oTab) - getOffsetTop(oLeft) < oLeft.scrollTop) {
        oLeft.scrollTop = getOffsetTop(oTab) - getOffsetTop(oLeft);
      }

      this.activeIndex = activeIndex;
    },
    handleJump(item) {
      // 跳转商品详情
      if (item.stockNum == 0) {
        return Toast("该商品已售罄");
      }

      this.$push(`/goodsDetail/${item.productOuterId}`);
    },
    handleReduce(e) {
      this.handleReduceOrAdd({
        e,
        count: -1
      });
    },
    handleAdd(e) {
      this.handleReduceOrAdd({
        e,
        count: 1
      });
    },
    handleReduceOrAdd({ e, count }) {
      const { classItem, classIndex, item, index } = e;
      const { stockNum, releaseStatus, selectCount } = item;

      if (stockNum === 0) {
        return Toast("该商品已售罄");
      }

      if (count > 0) {
        // 已经是最大库存了
        if (stockNum <= selectCount) return;
      }

      // 回调处理完才允许继续添加
      if (this._curItem) return;

      // 先更新数据，再增加
      this.handleUpdateItem({ classItem, classIndex, item, index, count });

      this.handleShowSku({ e, classItem, classIndex, item, index, count });
    },
    handleUpdateItem({ classItem, classIndex, item, index, count }) {
      // 更新前端显示数量
      this.$emit("handleUpdateItem", {
        index: this.index,
        item: {
          ...this.item,
          classifyList: this.item.classifyList.map((classIt, classI) => {
            if (classIndex === classI) {
              return {
                ...classIt,
                // 增加分类数量
                selectCount: classIt.selectCount + count,
                productList: classIt.productList.map((it, i) => {
                  if (index === i) {
                    return {
                      ...it,
                      // 增加商品数量
                      selectCount: it.selectCount + count
                    };
                  }
                  return it;
                })
              };
            }
            return classIt;
          })
        }
      });
    },
    handleSelectSku({ classItem, classIndex, item, index }, e) {
      // 回调处理完才允许继续添加
      if (this._curItem) return;
      this.handleShowSku({ e, classItem, classIndex, item, index });
    },
    handleShowSku({ e, classItem, classIndex, item, index, count }) {
      // 临时存储当前操作的商品，用于选择完sku之后回调使用
      this._curItem = {
        classItem,
        classIndex,
        item,
        index
      };

      // 弹出选择sku组件
      this.$refs[`skuBox-${this.item.fId}`].initData({
        e,
        count,
        dealerProductOutId: item.productOuterId
      });
    },
    // 加完购物车处理回调
    handleSelectSkuCallback(e) {
      // 关闭sku弹窗也会触发回调
      if (e) {
        let { chooseInfo, count } = e;
        // this.handleUpdateItem({
        //   ...this._curItem,
        //   count: count || chooseInfo.num,
        // });
        this.$emit("handleReload");
      }
      this._curItem = null;
    }
  }
};
</script>
<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

.classify-search {
  display: flex;
  height: 50px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 18px;
  height: 36px;
  line-height: 36px;
  margin: 0 12px;
  margin-bottom: 17px;
  .classify-search-left {
    flex: auto;
    display: flex;
    align-items: center;
    .classify-search-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 34px;
      color: #c0c4cc;
    }
    .classify-search-input-wrap {
      input {
        height: 36px;
        line-height: 36px;
      }
    }
  }
  .classify-search-right {
    flex: 0 0 52px;
    button {
      height: 50px;
      line-height: 50px;
      font-size: 13px;
      color: #303133;
      padding: 0;
      background: none;
      border: none;
    }
  }
}
.take-out-content {
  display: flex;
  height: calc(100vh); //calc(100% - 67px);
  &.is-tab-page {
    height: calc(100vh - env(safe-area-inset-bottom) - 48px);
  }
  .take-out-content-left {
    background: #f5f5f5;
    height: 100%;
    flex: 0 0 85px;
    overflow-y: auto;
    .take-out-content-left-list {
      text-align: center;
      background: white;
      .take-out-content-left-item {
        background: #f5f5f5;
        height: 50px;
        line-height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        span {
          &.name {
            flex: 1;
            font-size: 13px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          &.num {
            position: absolute;
            right: 2.5px;
            top: 9px;
            background: #f24e1f;
            border-radius: 14px;
            min-width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            color: white;
            font-size: 10px;
            padding: 0 2px;
          }
        }
        &.active {
          background: white;
          span {
            &.name {
              color: #333333;
              font-family: PingFangSC-Medium, PingFang SC;
              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 20px;
                background: rgba(255, 106, 0, 1);
                border-radius: 2px;
              }
            }
          }
          // &::after,
          // &::before {
          //   content: "";
          //   position: absolute;
          //   width: 100%;
          //   height: 8px;
          //   left: 0;
          // }
          // &::before {
          //   top: -8px;
          //   border-radius: 0 0 8px 0;
          // }
          // &::after {
          //   bottom: -8px;
          //   border-radius: 0 8px 0 0;
          // }
        }
        &.preActive {
          border-radius: 0 0 8px 0;
        }
        &.nextActive {
          border-radius: 0 8px 0 0;
        }
      }
    }
  }
  .take-out-content-right {
    box-sizing: border-box;
    height: 100%;
    flex: auto;
    background: white;
    overflow-y: auto;
    .take-out-content-right-content {
      padding: 8px;
      padding-right: 0;
      .take-out-content-right-goods-wrap {
        .take-out-content-right-banner {
          width: 266px;
          height: 80px;
          border-radius: 8px;
          background: #f5f5f5;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          margin-bottom: 27px;
        }
        .take-out-content-right-goods {
          .take-out-content-right-goods-title {
            color: #333;
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 21px;
          }
          .take-out-content-right-goods-list {
            margin-bottom: 20px;
            .take-out-content-right-goods-item {
              display: flex;
              padding: 12px 0;
              border-bottom: 0.5px solid #eeeeee;
              &:last-child {
                border: none;
              }
              .image {
                flex: 0 0 80px;
                width: 80px;
                height: 80px;
                background: #f5f5f5;
                border-radius: 8px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                position: relative;
                overflow: hidden;
                .sold-out {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.3);
                  color: #ffffff;
                  font-size: 15px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #ffffff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
              .info {
                flex: 0 0 187px;
                min-width: 0;
                margin-left: 7px;
                height: 80px;
                position: relative;
                .name {
                  font-size: 15px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #000000;
                  line-height: 18px;
                }
                .desc {
                  font-size: 12px;
                  font-family: PingFangSC-Light, PingFang SC;
                  font-weight: 300;
                  color: #999999;
                  line-height: 16px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .tags {
                  line-height: 20px;
                  padding-right: 12px;
                  // text-overflow: -o-ellipsis-lastline;
                  // overflow: hidden;
                  // text-overflow: ellipsis;
                  // display: -webkit-box;
                  // -webkit-line-clamp: 2;
                  // line-clamp: 2;
                  // -webkit-box-orient: vertical;
                  overflow: hidden;
                  // text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #ff6a00;
                  font-size: 11px;
                  span {
                    height: 15px;
                    line-height: 15px;
                    background: #ffe9d9;
                    border-radius: 2px;
                    padding: 0 3px;
                    margin-right: 5px;
                  }
                }
                .price-wrap {
                  .sell-price {
                    color: #ff6a00;
                    span {
                      font-size: 12px;
                    }
                    .price {
                      font-size: 20px;
                      font-family: PingFangSC-Semibold;
                    }
                  }
                  .del-price {
                    font-size: 13px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    margin-left: 4.5px;
                  }
                }
                .btns {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  height: 24px;
                  button {
                    padding: 0;
                    margin: 0;
                    &:after {
                      display: none;
                    }
                  }
                  .s-btns {
                    display: flex;
                    justify-content: flex-end;
                    .reduce,
                    .add {
                      flex: 0 0 24px;
                      width: 24px;
                      height: 24px;
                      background: #ff6a00;
                      border-radius: 8px;
                      color: white;
                      font-size: 16px;
                      border: 0.5px solid #ff6a00;
                      box-sizing: border-box;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      &[disabled] {
                        background: white;
                        color: #ff6a00;
                      }
                    }
                    span {
                      flex: 0 0 33.5px;
                      height: 24px;
                      line-height: 24px;
                      text-align: center;
                      font-size: 14px;
                    }
                  }
                  .m-btns {
                    .select-sku {
                      width: 53px;
                      height: 24.5px;
                      line-height: 24.5px;
                      background: #ff6a00;
                      border-radius: 12.5px;
                      position: relative;
                      color: white;
                      font-size: 12px;
                      text-align: center;
                      overflow: initial;
                      border: none;
                      span {
                        position: absolute;
                        top: -2.5px;
                        right: -2.5px;
                        min-width: 14px;
                        height: 14px;
                        line-height: 14px;
                        background: #f24e1f;
                        border-radius: 6px;
                        font-size: 10px;
                        text-align: center;
                        padding: 0 2px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
