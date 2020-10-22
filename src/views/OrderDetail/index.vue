<template>
  <div class="order-detai-wrap">
    <div class="order-detail-status">
      <img
        class="order-detail-status-bg"
        :src="require('@/assets/images/order-detail-logistics-top-bg.png')"
      />
      <div class="order-detail-status-content">
        <div class="left">
          <IconFont type="iconfahuo" fontStyle="font-size:16px" />
        </div>
        <div class="center">{{ orderStatus[info.orderStatus] }}</div>
        <div class="logistics-right">
          {{ deliveryMethod[info.deliveryMethod] }}
        </div>
      </div>
    </div>
    <van-swipe :autoplay="5000" indicator-color="#ff6a00">
      <van-swipe-item
        v-for="item in info.tenantOrderProdctShipmentNumbers"
        :key="item.shipmentNumber"
      >
        <div
          class="order-detail-logistics"
          @click="handleGoLogistics(item.shipmentNumber)"
        >
          <div class="left">
            <IconFont type="iconyunshuzhong" fontStyle="font-size:47rpx;" />
          </div>
          <div class="center">
            <div class="content">您的快递{{ item.statusCh }}</div>
            <div class="time">{{ item.shipmentPushtime }}</div>
          </div>
          <div class="right">
            <IconFont type="iconqianjin" fontStyle="font-size:30rpx;" />
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
          v-for="item in info.tenantOrderProdctDetails"
          :key="item.orderProdctDetailId"
          class="goods-item"
        >
          <img
            class="goods-img"
            :src="$ali(item.productSkuThumb, 80)"
            alt="商品图片"
          />
          <div class="goods-info">
            <div class="goods-title">{{ item.productName }}</div>
            <div class="goods-desc">{{ item.productSkuAttr }}</div>
            <div class="goods-price">¥{{ item.productTotalPrice }}</div>
          </div>
          <div class="goods-number">
            x
            <span>{{ item.productCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="order-detail-price" v-if="info.tenantOrderDiscounts.length > 0">
      <div class="title">订单信息</div>
      <div
        v-for="item in info.tenantOrderDiscounts"
        :key="item.orderDiscountId"
      >
        <div class="item">
          {{ item.orderDiscountName }}：
          <span class="value">¥{{ item.orderDiscountAmount }}</span>
        </div>
      </div>
      <div class="item">
        合计：
        <span class="value">¥{{ info.totalDisc }}</span>
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
      <div class="item">
        支付方式：
        <span class="value">{{ payChannel[info.payChannel] }}</span>
      </div>
      <div class="item">
        实付金额：
        <span class="value">¥{{ info.actuallyPaid }}</span>
      </div>
      <div class="item">
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
        <button v-if="info.orderStatus === 0">取消订单</button>
        <button class="active-order-btn" v-if="info.orderStatus === 0">
          立即付款
        </button>
        <button v-if="info.orderStatus === 3">查看物流</button>
        <button v-if="getShowRefundBtn">申请退款</button>
        <button v-if="info.orderStatus === 1 || info.orderStatus === 2">
          提醒发货
        </button>
        <button
          class="active-order-btn"
          v-if="info.orderStatus === 3"
          @click="onConfrimGoods(info.orderOuterId)"
        >
          确认收货
        </button>
        <block v-if="info.orderStatus === 4">
          <button>删除订单</button>
          <button>申请售后</button>
          <button>评价商品</button>
          <button>再次购买</button>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
import logisticsStatus from "@/utils/logisticsStatus";
import { formatTime } from "@/utils/index";
import { Toast } from "vant";
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
      orderStatus: [
        "待付款",
        "待发货",
        "部分发货",
        "待收货",
        "交易完成",
        "交易关闭"
      ],
      deliveryMethod: ["普通快递", "自提", "同城配送"],
      info: {
        tenantOrderDiscounts: [],
        tenantOrderProdctDetails: [],
        orderStatus: 0
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
    }
  },
  created() {
    this.getOrderDetailData();
  },
  mounted() {},
  methods: {
    // 请求得到页面数据
    getOrderDetailData() {
      const api = "/order/mobile/tenantOrder/findOrderDetail";
      this.$fetchGet(api, {
        orderId: this.$route.query.id
        // orderId: "LZWJWLQYNOLNM63OX7D1" // 和卫健调试用
      }).then(({ data }) => {
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
        const logisticsArr = data.tenantOrderProdctShipmentNumbers;
        logisticsArr.forEach(item => {
          item.shipmentPushtime = formatTime(item.shipmentPushtime);
          const logisticsItem = logisticsStatus.filter(
            i => i.status === item.shipmentState
          );
          item.statusCh =
            logisticsItem.length === 1 ? logisticsItem[0].name : "物流状态";
        });
        this.info = data;
      });
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
      this.$$fetchGet(api, { orderId: id }).then(() => {
        Toast("确认收货成功");
        this.getOrderDetailData();
      });
    },

    // 跳转到物流详情页
    handleGoLogistics(code) {
      this.$push({ path: "/orderLogistics", query: { code } });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.order-detai-wrap {
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
      justify-content: center;
      align-items: center;
      color: white;

      .left {
        flex: 0 0 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .center {
        font-size: 15px;
        flex: auto;
      }

      .logistics-right {
        flex: 0 0 76px;
        font-size: 15px;
      }
    }
  }

  .order-detail-logistics {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 78px;
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
          border: 1px solid #ff6a00;
          color: #ff6a00;
          font-size: 12px;
          text-align: center;
          margin-left: 6px;
        }
      }

      .address-info {
        margin-top: 16px;
        line-height: 1.2;
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
      border-bottom: 1px solid #eeeeee;
    }

    .goods-list {
      padding: 10px 0;

      .goods-item {
        padding: 0 8px 8px 8px;
        display: flex;
        position: relative;
        border-bottom: 1px solid #eeeeee;
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

          .goods-title {
            font-size: 15px;
            line-height: 15px;
            width: 225px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .goods-desc {
            margin-top: 10px;
            font-size: 13px;
            line-height: 13px;
            color: #999999;
            width: 225px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .goods-price {
            color: #ff6a00;
            font-size: 20px;
            position: absolute;
            left: 0;
            bottom: 0;
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
  }

  .order-detail-price {
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
      border-bottom: 1px solid #eeeeee;
    }

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
        border: 1px solid #c7c7c7;
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
    height: 52px;
    background: white;
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .show-pay-price {
      height: 28px;
      line-height: 28px;
      font-size: 15px;
      color: #999999;
      margin-left: 12px;

      text {
        color: #ff6a00;
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

      button {
        flex: 0 0 80px;
        height: 28px;
        line-height: 28px;
        background: #ffffff;
        border-radius: 20px;
        border: 1px solid #cccccc;
        padding: 0;
        margin: 0;
        font-size: 13px;
        color: #999999;
        margin-right: 12px;

        &:after {
          border: none;
        }
      }
    }
  }
}
</style>
