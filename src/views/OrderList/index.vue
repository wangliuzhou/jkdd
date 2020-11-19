<template>
  <div class="order-list-wrap">
    <div class="order-list-tabs">
      <div class="order-list-box">
        <div
          v-for="(item, index) in tabs"
          :key="item.name"
          class="order-list-tab"
          :class="{ 'tab-active': activeTabIndex === index }"
          @click="handleTabTap(index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <van-list
      v-model="loading"
      error-text="请求失败，点击重新加载"
      offset="100"
      :finished="finished"
      :error.sync="error"
      :immediate-check="false"
      style="heigth:100%"
      @load="getList"
    >
      <div v-if="list.length" class="order-list">
        <div class="order-item" v-for="(item, index) in list" :key="index">
          <div class="order-no" @click="handleGoDetail(item.orderOuterId)">
            订单编号：{{ item.orderOuterId }}
            <span class="order-status">{{ item.orderStatusCh }}</span>
          </div>
          <div class="goods-list" @click="handleGoDetail(item.orderOuterId)">
            <div
              v-for="it in item.tenantOrderProductDetails"
              :key="it.orderProdctDetailId"
            >
              <div class="goods-item">
                <div class="goods-img">
                  <van-image
                    :src="$ali(it.mainCover, 80)"
                    alt
                    fit="cover"
                    class="van-image"
                  />
                </div>
                <div class="goods-info">
                  <div class="goods-title">{{ it.productName }}</div>
                  <div class="goods-desc">{{ it.productSkuAttr }}</div>
                  <div class="goods-price">¥{{ it.productTotalPrice }}</div>
                </div>
                <div class="goods-number">x{{ it.productCount }}</div>
              </div>
            </div>
          </div>
          <div class="order-price">
            {{ item.orderStatus === 0 ? "应付金额:" : "总金额：" }}
            <span class="price">¥ {{ item.actuallyPaid }}</span>
          </div>
          <div class="order-btns">
            <div
              v-if="item.orderStatus === 0"
              @click="cancelOrder(item.orderOuterId)"
            >
              取消订单
            </div>
            <div
              class="active"
              v-if="item.orderStatus === 0"
              @click="handlePayDebounce(item.orderOuterId)"
            >
              立即付款
            </div>
            <div
              v-if="item.orderStatus === 1 || item.orderStatus === 2"
              @click="handleRemind(item.orderOuterId)"
            >
              提醒发货
            </div>
            <!-- 订单状态 0待付款 1待发货 2部分发货 3待收货 4交易完成-N天无理由内 5交易完成-7天无理由外 6交易关闭7支付中 8支付失败 -->
            <div
              class="active"
              v-if="
                item.orderStatus === 2 ||
                  item.orderStatus === 3 ||
                  item.orderStatus === 4 ||
                  item.orderStatus === 5
              "
              @click="goLogisticsPackagePage(item)"
            >
              查看物流
            </div>
            <!-- <div v-if="1" data-order-out-id="{{item.orderOuterId}}">评价商品</div>
      <div v-if="1" class="active" data-order-out-id="{{item.orderOuterId}}">再次购买</div>
      <div v-if="1" data-order-out-id="{{item.orderOuterId}}">延长收货</div>
            <div v-if="1" data-order-out-id="{{item.orderOuterId}}">删除订单</div>-->
            <div
              class="active"
              v-if="item.orderStatus === 3"
              @click="onConfrimGoods(item.orderOuterId)"
            >
              确认收货
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <div v-if="showNoOrderImg && !loading" class="no-order-wrap">
      <img
        class="no-order-img"
        :src="require('@/assets/images/empty-oreder.png')"
        alt
      />
      <span>暂无订单</span>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import Cfg from "@/config/index";
let timer;
export default {
  data() {
    return {
      lastChoosedStatusType: "",
      loading: false,
      finished: false,
      error: false,
      tabsList: [
        { name: "待付款", id: "0" },
        { name: "待发货", id: "1" },
        { name: "部分发货", id: "2" },
        { name: "待收货", id: "3" },
        { name: "交易完成", id: "4" },
        { name: "交易完成", id: "5" },
        { name: "交易关闭", id: "6" },
        { name: "付款中", id: "7" },
        { name: "付款失败", id: "8" }
      ],
      activeTabIndex: 0,
      list: [],
      showNoOrderImg: false,
      currentPage: 1,
      tabs: [
        // 后台id 要字符串类型
        { name: "全部", id: "" },
        { name: "待付款", id: "0" },
        { name: "待发货", id: "1" },
        { name: "待收货", id: "2" },
        { name: "待评价", id: "3" },
        { name: "售后", id: "4" }
      ]
    };
  },
  created() {
    this.init();
  },
  mounted() {},

  methods: {
    /**
     * 请求列表数据
     * @param {*} 点击tab触发请求,type=1
     * @param {*} 下拉触底触发请求,type=undefined
     */
    getList(type) {
      this.loading = true;
      const { tabs, currentPage, activeTabIndex } = this;
      const statusType = tabs[activeTabIndex].id;
      this.$fetchGet("/order/mobile/tenantOrder/findOrderPageMiniProgram", {
        statusType,
        currentPage
      })
        .then(({ data: { pages, records } }) => {
          // 解决频繁切换tabs，响应次序不对问题
          if (activeTabIndex === this.activeTabIndex) {
            // 在这里把list置空，而不是点击tab时置空，
            // 是为了让页面在请求时间内不变成空白
            if (type === 1) {
              this.list = [];
            }
            this.setFetchList(pages, records);
          }
        })
        .catch(() => {
          this.error = true;
          Toast("请求失败~");
        });
    },

    // 设置请求到数据
    setFetchList(pages, records) {
      this.loading = false;
      this.list = this.formatData(records);
      this.showNoOrderImg = this.list.length === 0;
      if (pages <= this.currentPage) {
        this.finished = true;
      }
      this.currentPage += 1;
    },

    // 点击tab标签
    handleTabTap(index) {
      console.log(222);

      index = Number(index);
      if (index !== this.activeTabIndex) {
        this.activeTabIndex = index;
        this.currentPage = 1;
        this.finished = false;
        this.loading = false;
        this.getList(1);
      }
    },

    // 初始化判断是否有状态代进页面，触发请求
    init() {
      const { activeIndex } = this.$route.query;
      if (activeIndex && activeIndex !== "undefined") {
        this.activeTabIndex = Number(activeIndex);
      } else {
        this.activeTabIndex = 0;
      }
      this.getList();
    },

    // 格式化出参数据
    formatData(records) {
      const { list, tabsList } = this;
      const addedList = records.map(item => {
        // 中文状态
        const arr = tabsList.filter(i => i.id === "" + item.orderStatus);
        if (arr.length > 0) return { ...item, orderStatusCh: arr[0].name };
        return item;
      });
      return list.concat(addedList);
    },

    // 点击跳转到详情页
    handleGoDetail(id) {
      this.$push({ path: "/orderDetail", query: { id } });
    },
    //取消订单
    cancelOrder(orderOuterId) {
      Dialog.confirm({
        title: "提示",
        message: "确定要取消订单吗？"
      })
        .then(() => {
          this.cancelOrderApi(orderOuterId);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 用户点击取消订单，点击弹窗中的确认后
    cancelOrderApi(orderOuterId) {
      this.$fetchPost("/order/mobile/tenantOrder/cancelOrder", { orderOuterId })
        .then(() => {
          Toast("订单取消成功");
          this.initFetch();
        })
        .catch(err => {
          Toast(err.message);
        });
    },
    initFetch() {
      this.currentPage = 1;
      this.list = [];
      this.getList();
    },
    handlePayDebounce(orderOutId) {
      this.debounce(this.handlePay, 300, orderOutId)();
    },
    debounce(fn, wait = 500, orderOutId) {
      return function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn(orderOutId);
        }, wait);
      };
    },
    //点击立即支付按钮
    handlePay(orderOutId) {
      this.$fetchPost("/order/mobile/tenantOrder/payOrder", {
        orderOutId,
        appid: Cfg.appid
      }).then(({ data: { jsapi_pay_info, total_amount } }) => {
        //唤起支付
        "xzwx"
          .requestPayment({
            ...jsapi_pay_info
          })
          .then(() => {
            Toast("支付成功");
            this.initFetch();
            this.updateOrderStatus(orderOutId);

            setTimeout(() => {
              this.$router.replace(`/payResult?price=${total_amount}`);
            }, 200);
          })
          .catch(() => {
            // Toast( "支付异常");
          });
      });
    },
    //点击提醒发货按钮
    handleRemind() {
      Toast("提醒发货成功");
    },
    //判断并跳转到多包裹页面
    goLogisticsPackagePage(item) {
      const {
        orderOuterId,
        multiplePackage,
        tenantOrderProductShipmentNumbers
      } = item;
      const { expCode, shipmentNumber } = tenantOrderProductShipmentNumbers[0];
      if (multiplePackage) {
        //跳转到多包裹页
        this.$push(`/logisticsPackage?orderOutId=${orderOuterId}`);
      } else {
        //跳转到订单物流页
        console.log(777, item);

        console.log(
          `/orderLogistics?expCode=${expCode}&shipmentNumber=${shipmentNumber}&orderOutId=${orderOuterId}`
        );

        this.$push(
          `/orderLogistics?expCode=${expCode}&shipmentNumber=${shipmentNumber}&orderOutId=${orderOuterId}`
        );
      }
    },
    //点击确认收货按钮
    onConfrimGoods(orderId) {
      Dialog.confirm({
        title: "提示",
        message: "确定要收货吗？"
      }).then(() => {
        this.$fetchGet("/order/mobile/tenantOrder/affirmReceivingOrder", {
          orderId
        })
          .then(() => {
            Toast("确认收货成功");
            this.initFetch();
          })
          .catch(() => {
            // on cancel
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.order-list-wrap {
  position: relative;
  padding-top: 60px;
  ::-webkit-scrollbar {
    display: none;
  }
  .order-list-tabs {
    width: 100%;
    overflow-x: auto;
    border-radius: 0 0 8px 8px;
    margin-bottom: 10px;
    background: #fff;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 2;

    .order-list-box {
      display: flex;
      align-items: center;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
      height: 51px;
      width: 112%;

      .order-list-tab {
        font-size: 15px;
        text-align: center;
        // margin: 0 15px;
        margin: 0 14px;
      }
      .tab-active {
        color: #ff6a00;
        position: relative;

        &::after {
          content: "";
          width: 20px;
          height: 4px;
          background: #ff6a00;
          border-radius: 2px;
          position: absolute;
          left: 50%;
          bottom: -70%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .order-list {
    padding-bottom: calc(env(safe-area-inset-bottom));
    height: 100%;
    width: 100%;

    .order-item {
      background: white;
      margin-bottom: 8px;
      border-radius: 8px 8px 0px 0px;
      overflow: hidden;
      .order-no {
        padding-left: 15px;
        height: 46px;
        line-height: 46px;
        color: #909399;
        position: relative;
        font-size: 13px;
        border-bottom: 1px solid #efefef;

        .order-status {
          position: absolute;
          color: #ff6a00;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
        }
      }

      .goods-list {
        border-bottom: 1px solid #efefef;
        .goods-item {
          padding: 10px 14px;
          display: flex;
          position: relative;

          .goods-img {
            flex: 0 0 80px;
            height: 80px;
            border-radius: 8px;
            background: #f0f0f0;

            .van-image {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          }

          .goods-info {
            margin-left: 12px;
            padding-top: 5px;
            position: relative;

            .goods-title {
              font-size: 15px;
              width: 225px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #333;
            }

            .goods-desc {
              margin-top: 10px;
              font-size: 13px;
              color: #999999;
              width: 225px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .goods-price {
              font-size: 15px;
              line-height: 20px;
              position: absolute;
              left: 0;
              bottom: 0;
              color: #666666;
            }
          }

          .goods-number {
            color: #999;
            font-size: 12px;
            position: absolute;
            right: 12px;
            top: 14px;
            line-height: 20px;
          }
        }
      }

      .order-price {
        height: 34px;
        line-height: 34px;
        font-size: 13px;
        color: #666666;
        text-align: right;
        padding-right: 15px;

        .price {
          color: #333;
        }
      }

      .order-btns {
        padding-top: 4px;
        padding-bottom: 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        background: white;
        padding-bottom: 7px;

        div {
          margin-right: 9px;
          margin-bottom: 6px;
          flex: 0 0 80px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #cccccc;
          font-size: 13px;
          color: #999999;
          &:after {
            border: none;
          }

          &.active {
            border: 1px solid #ff6a00;
            color: #ff6a00;
          }
        }
      }
    }
  }

  .no-order-wrap {
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    color: rgba(102, 102, 102, 1);

    .no-order-img {
      margin-top: 35%;
      width: 69px;
      height: 95px;
      margin-bottom: 20px;
    }
  }
}
</style>
