<template>
  <div class="order-detai-page">
    <div class="order-detail-status">
      <img
        class="order-detail-status-bg"
        :src="require('@/assets/images/order-detail-logistics-top-bg.png')"
      />
      <div class="order-detail-status-content">
        <div class="left">
          <IconFont type="iconfahuo" fontStyle="font-size:16px;" />
          <div class="order-status">{{ orderStatus[info.orderStatus] }}</div>
        </div>

        <div class="right">{{ deliveryMethod[info.deliveryMethod] }}</div>
      </div>
    </div>

    <div class="no-shipment" v-if="showNoShipment">
      <div class="order-detail-logistics">
        <div class="left">
          <IconFont type="iconyunshuzhong" fontStyle="font-size:24px;" />
        </div>
        <div class="center">
          <div class="content">暂无物流信息</div>
          <div class="time">{{ nowTime }}</div>
        </div>
        <div class="right">
          <IconFont type="iconqianjin" fontStyle="font-size:15px;" />
        </div>
      </div>
    </div>

    <van-swipe
      :autoplay="5000"
      indicator-color="#ff6a00"
      circular
      v-if="info.tenantOrderProductShipmentNumbers.length"
      :indicator-dots="info.tenantOrderProductShipmentNumbers.length > 1"
    >
      <van-swipe-item
        v-for="item in info.tenantOrderProductShipmentNumbers"
        :key="item.shipmentNumber"
      >
        <div
          class="order-detail-logistics"
          @click="handleGoLogistics(item.shipmentNumber)"
        >
          <div class="left">
            <IconFont type="iconyunshuzhong" fontStyle="font-size:24px;" />
          </div>
          <div class="center">
            <div class="content">您的快递{{ item.statusCh }}</div>
            <div class="time">{{ item.shipmentPushtime || "时间未知" }}</div>
          </div>
          <div class="right">
            <IconFont type="iconqianjin" fontStyle="font-size:15px;" />
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="order-detail-address">
      <div class="left">
        <IconFont type="iconweizhi" fontStyle="font-size:26px" />
      </div>
      <div class="right">
        <div class="user-info">
          {{ info.consigneeName }} {{ info.consigneePhoneFormat }}
          <span class="default-tag" v-if="info.isDefault === 1">默认</span>
        </div>
        <div class="address-info">{{ getTotalAddress }}</div>
      </div>
    </div>

    <div class="order-detail-goods">
      <div class="title">商品信息</div>
      <div class="goods-list">
        <div
          v-for="item in info.tenantOrderProductDetails"
          :key="item.orderProdctDetailId"
          class="goods-item"
          @click="goGoodsDetail(item.dealerProductOutId)"
        >
          <van-image
            class="goods-img"
            :src="$ali(item.mainCover, 80)"
            alt="商品图片"
            fit="cover"
          />
          <div class="goods-info">
            <div class="name-and-price">
              <div class="goods-title">{{ item.productName }}</div>
              <div>实付：¥{{ item.discountPrice }}</div>
            </div>
            <div class="desc-and-origin-price">
              <div class="goods-desc">{{ item.productSkuAttr || "" }}</div>
              <div>¥{{ item.productUnitPrice }}</div>
            </div>
            <div class="desc-and-origin-price">
              <div></div>
              <div>x{{ item.productCount }}</div>
            </div>
            <div class="order-detail-btns">
              <div
                @click.stop="handleApplyAfterSale"
                style="margin:12px 0 0 0"
                v-if="getShowAfterSaler"
              >
                申请售后
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="total-price-box">
        <span class="goods-number">
          共{{
            info.tenantOrderProductDetails &&
              info.tenantOrderProductDetails.length
          }}件，
        </span>
        <span class="computed-text">小计:</span>
        <span class="money">￥{{ getOriginTotalPrice }}</span>
      </div>
    </div>

    <div class="order-detail-price">
      <div class="title">订单信息</div>
      <div v-if="info.tenantOrderDiscounts.length">
        <div
          v-for="item in info.tenantOrderDiscounts"
          :key="item.orderDiscountId"
        >
          <div class="item">
            <span class="label">{{ item.orderDiscountName }}：</span>
            <span class="value">¥{{ item.orderDiscountAmount }}</span>
          </div>
        </div>
      </div>
      <div class="item">
        <span class="label">运费：</span>
        <span class="value">¥{{ info.freightPrice }}</span>
      </div>
      <div class="item" v-if="info.orderStatus !== 0">
        <span class="label" style="color:#333333">实付款：</span>
        <span class="value" style="color:#ff6a00"
          >¥{{ info.actuallyPaid }}</span
        >
      </div>
      <div class="item" v-if="info.userRemark">
        <span class="label">留言：</span>
        <span class="value">{{ info.userRemark }}</span>
      </div>
    </div>

    <div class="order-detail-invoice" v-if="info.isInvoice === 1">
      <div class="item">
        发票类型：
        <span class="value"
          >{{ info.invoiceType ? "增值税" : "普通" }}发票</span
        >
      </div>
      <div class="item">
        发票抬头：
        <span class="value">{{ info.invoiceTitle }}</span>
      </div>
      <div class="item">
        发票内容：
        <span class="value">{{ info.invoiceContent }}</span>
      </div>
    </div>

    <div class="order-detail-pay">
      <div class="item">
        订单编号：
        <span class="value">{{ info.orderOuterId }}</span>
        <span class="copy-btn" @click="onClickCopyBtn(info.orderOuterId)"
          >复制</span
        >
      </div>
      <div class="item">
        提交时间：
        <span class="value">{{ getCreateData }}</span>
      </div>
      <div class="item" v-if="info.payChannel">
        支付方式：
        <span class="value">{{ payChannel[info.payChannel] }}</span>
      </div>
      <div class="item" v-if="info.payDate">
        付款时间：
        <span class="value">{{ getPayData }}</span>
      </div>
    </div>

    <div class="order-detail-bottom-btns">
      <div class="show-pay-price" v-if="info.orderStatus === 0">
        应付金额:
        <span>￥{{ info.actuallyPaid }}</span>
      </div>
      <div class="order-detail-btns">
        <div v-if="info.orderStatus === 0" @click="handleCancelOrder">
          取消订单
        </div>
        <div
          v-if="info.orderStatus === 1 || info.orderStatus === 2"
          @click="handleRemind"
        >
          提醒发货
        </div>
        <div
          class="active-order-btn"
          v-if="info.orderStatus === 0"
          @click="handlePayDebounce"
        >
          立即付款
        </div>
        <div
          class="active-order-btn"
          v-if="
            info.orderStatus === 2 ||
              info.orderStatus === 3 ||
              info.orderStatus === 4 ||
              info.orderStatus === 5
          "
          @click="goLogisticsPackagePage"
        >
          查看物流
        </div>
        <div
          class="active-order-btn"
          v-if="info.orderStatus === 3"
          @click="onConfrimGoods(info.orderOuterId)"
        >
          确认收货
        </div>
        <!-- 订单状态 0待付款 1待发货 2部分发货 3待收货 4交易完成-N天无理由内 5交易完成-7天无理由外 6交易关闭7支付中 8支付失败 -->
        <!-- <div v-if="getShowRefundBtn}}">申请退款</div> -->
        <!-- <block v-if="info.orderStatus===4}}">
        <div>删除订单</div>
        <div>评价商品</div>
        <div>再次购买</div>
        </block>-->
      </div>
    </div>
  </div>
</template>

<script>
import logisticsStatus from "@/utils/logisticsStatus";
import { formatTime } from "@/utils/index";
import { Toast, Dialog } from "vant";
import Cfg from "@/config/index";
let timer;
export default {
  data() {
    return {
      payChannel: [
        "微信支付",
        "支付宝支付",
        "银行卡快捷支付",
        "余额支付",
        "线下对公转账"
      ],

      // 订单状态 0待付款 1待发货 2部分发货 3待收货 4交易完成-N天无理由内 5交易完成-7天无理由外 6交易关闭7支付中 8支付失败
      orderStatus: [
        "待付款",
        "待发货",
        "部分发货",
        "待收货",
        "交易完成",
        "交易完成",
        "交易关闭",
        "支付中",
        "支付失败"
      ],
      deliveryMethod: ["普通快递", "自提", "同城配送"],
      info: {
        tenantOrderDiscounts: [],
        orderStatus: 0,
        tenantOrderProductShipmentNumbers: [],
        tenantOrderProductDetails: []
      }
    };
  },
  computed: {
    getTotalAddress() {
      const { info } = this;
      const {
        consigneeAdress = "",
        consigneeAddressProvince = "",
        consigneeAddressCity = "",
        consigneeAddressShareDesk = ""
      } = info;
      return (
        consigneeAddressProvince +
        consigneeAddressCity +
        consigneeAddressShareDesk +
        consigneeAdress
      );
    },
    getCreateData() {
      const { info } = this;
      if (info.createDate) {
        return formatTime(info.createDate);
      }
      return "";
    },
    getPayData() {
      const { info } = this;
      if (info.payDate) {
        return formatTime(info.payDate);
      }
      return "";
    },
    getShowRefundBtn() {
      const { info } = this;
      return [1, 2].includes(info.orderStatus);
    },
    showNoShipment() {
      const {
        info: { tenantOrderProductShipmentNumbers, orderStatus }
      } = this;
      return (
        tenantOrderProductShipmentNumbers &&
        tenantOrderProductShipmentNumbers.length === 0 &&
        [2, 3, 4, 5].includes(orderStatus)
      );
    },
    getOriginTotalPrice() {
      const { info } = this;
      if (info.tenantOrderDiscounts) {
        return (
          info.tenantOrderProductDetails
            .reduce((pre, next) => {
              return pre + next.productUnitPrice * next.productCount;
            }, 0)
            .toFixed(2) * 1
        );
      }
      return null;
    },
    getShowAfterSaler() {
      const { info } = this;
      if (info.orderStatus) {
        return [1, 2, 3, 4].includes(info.orderStatus);
      }
      return false;
    }
  },
  created() {
    this.getOrderDetailData();
  },
  methods: {
    //判断并跳转到多包裹页面
    goLogisticsPackagePage() {
      const { info, id } = this;
      const { tenantOrderProductDetails, multiplePackage } = info;
      if (multiplePackage) {
        //跳转到多包裹页
        this.$push(`/pages/logisticsPackage/index?orderOutId=${id}`);
      } else {
        //跳转到订单物流页
        const { expCode, shipmentNumber } = tenantOrderProductDetails[0];
        this.$push(
          `/pages/orderLogistics/index?expCode=${expCode}&shipmentNumber=${shipmentNumber}&orderOutId=${id}`
        );
      }
    },
    //支付按钮
    handlePayDebounce() {
      this.debounce(this.handlePay, 300, this.$route.query.id)();
    },
    //支付按钮
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

    //支付按钮
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
            wx.showToast({
              title: "支付成功",
              icon: "none"
            });

            this.updateOrderStatus(orderOutId);

            setTimeout(() => {
              wx.redirectTo({
                url: `/pages/payResult/index?price=${total_amount}`
              });
            }, 500);
          })
          .catch(() => {
            // wx.showToast({
            //   title: "支付异常",
            //   icon: "none"
            // });
          });
      });
    },
    //点击提醒发货按钮
    handleRemind() {
      Toast("提醒发货成功");
    },
    //取消订单
    handleCancelOrder() {
      Dialog.confirm({
        title: "提示",
        message: "确定要取消订单吗？"
      })
        .then(() => {
          this.cancelOrderApi();
        })
        .catch(() => {
          // on cancel
        });
    },
    // 用户点击取消订单，点击弹窗中的确认后
    cancelOrderApi() {
      this.$fetchPost("/order/mobile/tenantOrder/cancelOrder", {
        orderOuterId: this.$route.query.id
      })
        .then(() => {
          Toast("订单取消成功");
          this.getOrderDetailData();
        })
        .catch(err => {
          Toast(err.message);
        });
    },
    // 请求得到页面数据
    getOrderDetailData() {
      this.$fetchGet("/order/mobile/tenantOrder/findOrderDetail", {
        orderId: this.$route.query.id
      }).then(({ data }) => {
        this.formatData(data);
      });
    },
    // 格式/渲染 请求的数据
    formatData(data) {
      // 格式化手机号
      const phone = data.consigneePhone;
      const formatPhone = phone.replace(phone.substr(3, 4), "****");
      data.consigneePhoneFormat = formatPhone;
      //格式化
      const totalDisc = data.tenantOrderDiscounts.reduce(
        (pre, next) => pre + next.orderDiscountAmount,
        0
      );
      data.totalDisc = totalDisc;
      //格式化物流时间和状态
      const logisticsArr = data.tenantOrderProductShipmentNumbers;

      if (logisticsArr) {
        logisticsArr.forEach(item => {
          item.shipmentPushtime = item.shipmentPushtime
            ? formatTime(item.shipmentPushtime)
            : null;
          const logisticsItem = logisticsStatus.filter(
            i => i.status === item.shipmentState
          );
          item.statusCh =
            logisticsItem.length === 1 ? logisticsItem[0].name : "暂无轨迹";
        });
      }

      this.info = data;
    },

    // 点击按钮，复制订单id到剪切板
    onClickCopyBtn(orderOuterId) {
      console.log(orderOuterId);
      this.$copyText(orderOuterId)
        .then(() => Toast(`复制${orderOuterId}成功`))
        .catch(() => Toast(`复制失败`));
    },

    //点击确认收货按钮
    onConfrimGoods(id) {
      const api = "/order/mobile/tenantOrder/affirmReceivingOrder";
      this.$fetchGet(api, { orderId: id }).then(() => {
        Toast("确认收货成功");
        this.getOrderDetailData();
      });
    },

    // 跳转到物流详情页
    handleGoLogistics(code) {
      this.$push({ path: "/orderLogistics", query: { code } });
    },
    // 跳转商品详情
    goGoodsDetail(id) {
      this.$push(`/goodsDetail/${id}`);
    },
    //点击申请售后按钮
    handleApplyAfterSale() {
      Dialog.confirm({
        title: "提示",
        message: "该商户品类暂不支持直接申请售后，请联系客服处理。"
      })
        .then(() => {
          this.$push("/index");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.order-detai-page {
  background: #f8f8f8;
  padding-bottom: calc(env(safe-area-inset-bottom) + 65px);
  .order-detail-status {
    height: 60px;
    position: relative;

    .order-detail-status-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .order-detail-status-content {
      height: 100%;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      padding: 0 12px;
      box-sizing: border-box;

      .left {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 15px;
        .order-status {
          margin-left: 8px;
        }
      }
      .right {
        font-size: 15px;
      }
    }
  }

  .swiper-class {
    height: 77.5px;
  }

  .order-detail-logistics {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 77.5px;
    background: white;

    .left {
      flex: 0 0 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666;
    }

    .center {
      font-size: 15px;
      flex: auto;

      .content {
        color: #333333;
        line-height: 1;
      }

      .time {
        margin-top: 12px;
        line-height: 1;
        color: #666666;
      }
    }

    .right {
      flex: 0 0 21px;
      color: #cccccc;
    }
  }

  .order-detail-address {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 16px 0;
    padding-right: 16px;
    border-bottom: 1px solid #ff6a00;

    .left {
      flex: 0 0 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666;
    }

    .right {
      font-size: 15px;
      flex: auto;

      .user-info {
        color: #333333;
        line-height: 1;
        display: flex;
        align-items: center;

        .default-tag {
          width: 32px;
          height: 16px;
          line-height: 16px;
          border-radius: 8px;
          border: 0.5px solid #ff6a00;
          color: #ff6a00;
          font-size: 12px;
          text-align: center;
          margin-left: 6px;
        }
      }

      .address-info {
        margin-top: 12px;
        line-height: 1;
        color: #666666;
      }
    }
  }

  .order-detail-goods {
    width: 363px;
    background: white;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 8px;

    .title {
      padding-left: 8px;
      height: 36px;
      line-height: 36px;
      color: #333333;
      border-bottom: 0.5px solid #eeeeee;
      font-size: 14px;
    }

    .goods-list {
      padding: 10px 0;

      .goods-item {
        padding: 0 7.5px 7.5px 7.5px;
        display: flex;
        position: relative;
        border-bottom: 0.5px solid #eeeeee;
        margin-bottom: 8px;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .goods-img {
          flex: 0 0 80px;
          height: 80px;
          background: #f0f0f0;
          border-radius: 8px;
        }

        .goods-info {
          margin-left: 12px;
          padding-top: 5px;
          position: relative;
          flex: 1;
          .name-and-price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
            .goods-title {
              width: 165px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .desc-and-origin-price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #999999;
            &.float-right {
              align-self: flex-end;
            }
            .goods-desc {
              margin-top: 10px;
              width: 165px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .goods-number {
          color: #ff6a00;
          font-size: 12px;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);

          text {
            font-size: 20px;
          }
        }
      }
    }

    .total-price-box {
      text-align: right;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      padding: 12px;
      .goods-number {
        color: #909399;
      }
      .computed-text {
        color: #333333;
      }
      .money {
        color: #ff6a00;
      }
    }
  }

  .order-detail-price {
    width: 363px;
    background: white;
    border-radius: 8px;
    margin: 8px auto 0;
    padding-bottom: 6px;

    .title {
      padding-left: 8px;
      height: 36px;
      line-height: 36px;
      color: #333333;
      border-bottom: 0.5px solid #eeeeee;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .item {
      font-size: 13px;
      line-height: 1;
      color: #333333;
      padding: 6px 8px;
      display: flex;
      .label {
        white-space: nowrap;
      }
      .value {
        color: #666666;
      }
    }
  }

  .order-detail-invoice {
    width: 363px;
    background: white;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 8px;
    padding: 6px 0;

    .item {
      font-size: 13px;
      line-height: 1;
      color: #333333;
      padding: 6px 8px;

      .value {
        color: #666666;
      }
    }
  }

  .order-detail-pay {
    width: 363px;
    background: white;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 8px;
    padding: 6px 0;

    .item {
      font-size: 13px;
      line-height: 1;
      color: #333333;
      padding: 6px 8px;
      display: flex;
      align-items: center;

      .value {
        color: #666666;
      }

      .copy-btn {
        flex: 0 0 32px;
        height: 16px;
        line-height: 16px;
        border-radius: 8px;
        border: 0.5px solid #c7c7c7;
        margin-left: 10px;
        font-size: 12px;
        text-align: center;
      }
    }
  }

  .order-detail-bottom-btns {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 42px;
    background: white;
    padding-top: 12px;
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 0.5px solid #eeeeee;
    display: flex;
    justify-content: space-between;

    .show-pay-price {
      height: 28px;
      line-height: 28px;
      font-size: 15px;
      color: #999999;
      margin-left: 12px;

      span {
        color: #ff6a00;
      }
    }
  }
  .order-detail-btns {
    display: flex;
    justify-content: flex-end;
    flex: 1;

    .active-order-btn {
      color: #ff6a00;
      border-color: #ff6a00;
    }

    div {
      flex: 0 0 80px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #cccccc;
      font-size: 13px;
      color: #999999;
      margin-right: 9px;

      &:after {
        border: none;
      }
    }
  }
}
</style>
