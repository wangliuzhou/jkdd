<template>
  <div class="logistics-package-wrap">
    <div class="notice">{{ getSendedList.length }}个包裹已发出</div>
    <div v-for="item in getSendedList" :key="item.shipmentNumber">
      <div class="card-box" @click="goLogisticsDetail(item)">
        <div class="top-box">
          <div class="top-box-left">
            <IconFont
              type="iconfahuo"
              fontStyle="font-size:0.37rem;color:#ccc"
            />
            <div class="status">{{ item.shipmentStatusCh }}</div>
          </div>
          <div class="logistics-code">
            {{ item.shipmentName || "物流编号" }}：{{ item.shipmentNumber }}
          </div>
        </div>
        <div class="status-detail" v-if="item.shipmentStatusCh">
          您的订单{{ item.shipmentStatusCh }}
        </div>
        <div class="goods-image-box">
          <div
            v-for="i in item.findOrderPackagesProductInfoVOS"
            :key="i.orderProductDetailId"
            wx:for-item="i"
          >
            <van-image :src="$ali(i.mainCover, 80)" fit="cover" />
          </div>
        </div>
        <div class="goods-count">
          共{{ item.findOrderPackagesProductInfoVOS.length }}件商品
        </div>
      </div>
    </div>

    <div v-for="item in getNotSendedList" :key="item">
      <div class="card-box">
        <div class="top-box">
          <div class="top-box-left">
            <IconFont
              type="iconfahuo"
              fontStyle="font-size:0.37rem;color:#ccc"
            />
            <div class="status">待发货</div>
          </div>
        </div>
        <div class="status-detail">您的包裹会尽快发出，请耐心等待</div>
        <div class="goods-image-box">
          <div
            v-for="i in item.findOrderPackagesProductInfoVOS"
            :key="i.orderProductDetailId"
            wx:for-item="i"
          >
            <van-image :src="$ali(i.mainCover, 80)" fit="cover" />
          </div>
        </div>
        <div class="goods-count">共1件商品</div>
      </div>
    </div>
  </div>
</template>

<script>
import logisticsStatus from "@/utils/logisticsStatus";
export default {
  components: {},
  data() {
    return { list: [] };
  },
  computed: {
    getSendedList() {
      const { list } = this;
      const arr = list.filter(i => i.status === 1);
      arr.forEach(item => {
        const idx = logisticsStatus.findIndex(i => i.status === item.aaastatus);
        item.shipmentStatusCh = idx > 0 ? logisticsStatus[idx].name : "已发货";
      });
      return arr;
    },
    getNotSendedList() {
      const { list } = this;
      return list.filter(i => i.status === 0);
    }
  },
  created() {
    this.getInitData();
  },
  mounted() {},
  methods: {
    getInitData() {
      this.$fetchGet("/order/mobile/tenantOrder/findOrderPackagesInfo", {
        orderId: this.$route.query.orderOutId
      }).then(({ data }) => {
        this.list = data;
      });
    },
    goLogisticsDetail(item) {
      const { shipmentNumber, expCode } = item;
      this.$push(
        `/orderLogistics?expCode=${expCode}&shipmentNumber=${shipmentNumber}&orderOutId=${this.$route.query.orderOutId}`
      );
    }
  }
};
</script>
<style lang="less" scoped>
.logistics-package-wrap {
  background: #f8f8f8;
  padding-bottom: calc(env(safe-area-inset-bottom));
  .notice {
    width: 375px;
    height: 37.5px;
    background: #fff9ed;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff5e00;
    padding-left: 15px;
    box-sizing: border-box;
  }
}
.card-box {
  margin: 10px 6.5px 0 6.5px;
  border-radius: 8px;
  padding: 7.5px 7.5px 10px 7.5px;
  box-sizing: border-box;
  background: #fff;
  &:nth-last-child(1) {
    margin-bottom: 24px;
  }
  .top-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .top-box-left {
      display: flex;
      align-items: center;

      .status {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff6a00;
        margin-left: 5px;
      }
    }
    .logistics-code {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .status-detail {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2f3134;
    margin: 4px 0 12px 0;
  }
  .goods-image-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
    }
  }
  .goods-count {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    margin-top: 12px;
  }
}
</style>
