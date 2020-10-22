<template>
  <div class="goods-group-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <div class="scroll-view">
        <div v-for="(item, index) in list" :key="item.name">
          <div class="item" @click="handleGoGoodsDetail(item.dealerProductId)">
            <div class="item-top">
              <img
                class="item-bg-img"
                src="http://suo.im/5RnTIO"
                alt="商品图"
              />
              <div class="item-top-tag">新品</div>
            </div>
            <div class="item-detail">
              <div class="name van-multi-ellipsis--l2">
                {{ item.dealerProductName }}
              </div>
              <div class="price">
                <div class="sale-price">￥{{ item.minPrice }}</div>
                <div class="original-price" v-if="index === 1">
                  ￥{{ item.delPrice }}
                </div>
                <div class="point" v-else>积分兑换</div>
              </div>
              <div class="sale-number-buy-btn">
                <div class="sale-number">月销{{ item.sellCount }}件</div>
                <div class="buy-btn">购买</div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-data-box" v-if="showNoDataImg">
          <image class src="./../../assets/image/order_no_oreder.png" />暂无数据
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      showNoDataImg: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 请求列表数据
     */
    getList() {
      const api = "/inner/tenantProduct/selectDealerProductByFrontId";
      const params = {
        frontCateOutId: this.$route.query.frontCateOutId,
        // frontCateOutId: "TFC00000001",
        currentPage: this.currentPage,
        pageSize: 10
      };
      this.$fetchGet(api, params)
        .then(({ data: { pages, records } }) => {
          this.setFetchList(pages, records);
        })
        .catch(() => {
          this.loading = false;
          Toast("请求出错啦");
        });
    },
    //格式化出参，渲染页面
    setFetchList(pages, records) {
      const arr = this.list.concat(records);
      if (arr.length === 0) {
        this.showNoDataImg = true;
      } else {
        this.showNoDataImg = false;
        this.list = arr;
        this.loading = false;
        if (pages <= this.currentPage) {
          this.finished = true;
        }
      }
    },
    //跳转商品详情页
    handleGoGoodsDetail(id) {
      this.$push({
        path: "/goodsDetail",
        query: { id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
page {
  background: #f8f8f8;
  padding-bottom: env(safe-area-inset-bottom);
}
.goods-group-container {
  // height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: rgba(248, 248, 248, 1);
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;

  .scroll-view {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 174px;
      margin-top: 10px;
      border-radius: 8px;
      overflow: hidden;
      &:nth-last-child(1),
      &:nth-last-of-type(2) {
        margin-bottom: 10px;
      }

      .item-top {
        position: relative;

        .item-bg-img {
          width: 100%;
          height: 120px;
          background: rgba(242, 242, 242, 1);
          display: block;
        }

        .item-top-tag {
          position: absolute;
          top: 0;
          right: 12px;
          width: 28px;
          height: 22px;
          background: rgba(255, 106, 0, 1);
          border-radius: 0px 0px 6px 6px;
          font-size: 11px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .item-detail {
        background: #fff;
        padding: 8px 12px 2px 12px;
        box-sizing: border-box;

        .name {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          text-align: justify;
        }

        .price {
          color: rgba(255, 106, 0, 1);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          display: flex;
          align-items: flex-end;
          margin-top: 10px;

          .sale-price {
            font-size: 18px;
          }

          .original-price {
            font-size: 13px;
            margin: 0 0 2px 8px;
            text-decoration: line-through;
          }

          .point {
            width: 51px;
            height: 15px;
            background: rgba(255, 233, 217, 1);
            border-radius: 2px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 106, 0, 1);
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0 4px 4px;
          }
        }

        .sale-number-buy-btn {
          display: flex;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          display: flex;
          align-items: center;
          height: 40px;
          justify-content: space-between;

          .sale-number {
            font-size: 13px;
            color: rgba(153, 153, 153, 1);
          }

          .buy-btn {
            width: 44px;
            height: 25px;
            background: rgba(255, 106, 0, 1);
            border-radius: 12px;
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .no-data-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333333;
    image {
      width: 70px;
      height: 100px;
      margin-bottom: 12px;
    }
  }
}
</style>
