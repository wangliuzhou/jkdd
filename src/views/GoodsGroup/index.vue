<template>
  <div class="goods-group-container">
    <van-list
      v-if="list.length"
      v-model="loading"
      :finished="finished"
      offset="100"
      @load="chooseFunction"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
    >
      <div class="list">
        <div
          class="item"
          v-for="item in list"
          :key="item.dealerProductOutId"
          @click="handleGoGoodsDetail(item.dealerProductOutId)"
        >
          <div class="item-top">
            <img
              class="item-bg-img"
              :src="$ali(item.mainCover, 348)"
              alt="商品图"
            />
          </div>
          <div class="item-detail">
            <div class="name">{{ item.dealerProductName }}</div>
            <div class="price">
              <div class="price-text">
                <div class="sale-price">￥{{ item.minPrice }}</div>
                <div class="original-price" v-if="item.delPrice">
                  ￥{{ item.delPrice }}
                </div>
              </div>
              <div class="buy-btn">购买</div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <div class="no-data-box" v-if="showNoDataImg">
      <img class :src="require('@/assets/images/order_no_order.png')" />
      暂无数据
    </div>
    <BottomLogo />
  </div>
</template>

<script>
import { Toast } from "vant";
import BottomLogo from "@/components/BottomLogo";
export default {
  components: {
    BottomLogo
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      pages: 2,
      error: false
    };
  },
  computed: {
    showNoDataImg() {
      return !this.list.length && !this.loading;
    }
  },
  created() {
    this.chooseFunction();
  },
  mounted() {},
  methods: {
    chooseFunction() {
      const { frontCateOutId, productGroupId } = this.$route.query;
      this.loading = true;
      if (frontCateOutId) {
        this.getList();
      } else if (productGroupId) {
        this.getGroupByIdList();
      } else {
        this.getProductIdsList();
      }
    },
    //格式化出参，渲染页面
    setFetchList(pages, records) {
      const arr = this.list.concat(records);
      this.list = arr;
      this.error = false;
      this.loading = false;
      if (pages <= this.currentPage) {
        this.finished = true;
      }
      this.currentPage = this.currentPage + 1;
    },
    /**
     * 请求列表数据
     */
    getList() {
      this.$fetchGet("/inner/tenantProduct/selectDealerProductByFrontId", {
        frontCateOutId: this.$route.query.frontCateOutId,
        currentPage: this.currentPage,
        pageSize: 10
      })
        .then(({ data: { pages, records } }) => {
          this.setFetchList(pages, records);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
          Toast("请求出错啦");
        });
    },

    /**
     * 当入参字段为productGroupId时候
     * 请求列表数据
     */
    getGroupByIdList() {
      this.$fetchGet("/mobile/tenantProduct/findProductGroupById", {
        productGroupId: this.$route.query.productGroupId,
        currentPage: this.currentPage,
        pageSize: 10
      })
        .then(({ data: { pages, records } }) => {
          this.setFetchList(pages, records);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
          Toast("请求出错啦");
        });
    },
    getProductIdsList() {
      const api = "/mobile/tenantProduct/selectDealerProductBatch";
      const params = {
        dealerProductOutId: this.$route.query.productIds.split(","),
        currentPage: this.currentPage,
        pageSize: 10
      };
      this.$fetchPost(api, params)
        .then(({ data: { pages, records } }) => {
          this.setFetchList(pages, records);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
          Toast("请求出错啦");
        });
    },
    //跳转商品详情页
    handleGoGoodsDetail(id) {
      this.$push({
        path: `/goodsDetail/${id}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.goods-group-container {
  padding-bottom: env(safe-area-inset-bottom);
  // height: 100vh;
  background: rgba(248, 248, 248, 1);
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;

  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      // background: rgb(188, 226, 156);
      background: #fff;
      width: 174px;
      margin-bottom: 10px;
      border-radius: 8px;
      overflow: hidden;
      &:nth-child(1),
      &:nth-child(2) {
        margin-top: 10px;
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
          right: 12.5px;
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
          height: 42px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          text-align: justify;
        }

        .price {
          color: rgba(255, 106, 0, 1);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          margin-top: 4px;
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding-bottom: 12px;
          .price-text {
            display: flex;
            align-items: flex-end;
          }

          .buy-btn {
            width: 44px;
            height: 24.5px;
            background: rgba(255, 106, 0, 1);
            border-radius: 12.5px;
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .sale-price {
            font-size: 18px;
          }

          .original-price {
            font-size: 13px;
            margin: 0 0 2px 4px;
            text-decoration: line-through;
            color: #999999;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
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
            height: 24.5px;
            background: rgba(255, 106, 0, 1);
            border-radius: 12.5px;
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
}
.no-data-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333333;
  img {
    width: 70px;
    height: 100px;
    margin-bottom: 12px;
  }
}
</style>
