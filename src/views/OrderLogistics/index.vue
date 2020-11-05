<template>
  <div>
    <div class="order-logistics-top">
      <img
        class="order-logistics-bg"
        :src="require('@/assets/images/order-detail-logistics-top-bg.png')"
        alt
      />
      <div class="order-logistics-top-content">
        <div class="order-status">{{ getStatus }}</div>
        <div class="order-info">
          <div class="order-goods">
            <img :src="$ali(info.mainCover, 160)" alt />
            <span>{{ info.productCount }}件商品</span>
          </div>
          <div class="order-logistics">
            <div>配送企业：{{ info.shipperName }}</div>
            <div>快递单号：{{ logisticsCode }}</div>
            <!-- <div>联系电话：没字段</div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="order-logistics-detail">
      <div class="order-logistics-detail-title">物流详情</div>
      <div class="order-logistics-list">
        <div v-for="(item, index) in info.maps" :key="item.AcceptStation">
          <div class="order-logistics-item">
            <div :class="['order-logistics-content', { active: index === 0 }]">
              <view class="pint">
                <img
                  v-if="item.Action === '1' && index !== 0"
                  :src="require('@/assets/images/logistics/logistics1.png')"
                  class="logistics-status-icon"
                />
                <img
                  v-if="item.Action === '2' && index !== 0"
                  :src="require('@/assets/images/logistics/logistics2.png')"
                  class="logistics-status-icon"
                />
                <img
                  v-if="item.Action === '201' && index !== 0"
                  :src="require('@/assets/images/logistics/logistics201.png')"
                  class="logistics-status-icon"
                />
                <img
                  v-if="item.Action === '202' && index !== 0"
                  :src="require('@/assets/images/logistics/logistics202.png')"
                  class="logistics-status-icon"
                />
                <IconFont
                  v-if="index === 0"
                  type="iconyiqianshou"
                  fontStyle="font-size:36rpx"
                />
              </view>
              <div class="order-logistics-item-title" v-if="index === 0">
                {{ getStatus }}
              </div>
              <div class="order-logistics-item-content">
                {{ item.AcceptStation }}
              </div>
              <div class="order-logistics-item-time">{{ item.AcceptTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logisticsStatus from "@/utils/logisticsStatus";
export default {
  name: "",
  data() {
    return {
      info: { maps: [] },
      logisticsCode: ""
    };
  },
  computed: {
    getStatus() {
      const { info } = this;
      if (info.state) {
        for (let item of logisticsStatus) {
          if (item.status + "" === info.state) {
            return item.name;
          }
        }
      }
      return "";
    }
  },
  created() {
    this.getInitData();
  },
  methods: {
    /**
     * 请求得到页面数据
     */
    async getInitData() {
      const { expCode, shipmentNumber, orderOutId } = this.$route.query;
      const { data } = await this.$fetchGet(
        "/express/kdniaoSubscribe/selectExpressInfoByCode",
        {
          expCode,
          expNo: shipmentNumber,
          orderOutId
        }
      );
      console.log("物流信息", data);
      data.maps = data.maps.reverse();
      this.info = data;
      this.logisticsCode = shipmentNumber;
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
.order-logistics-top {
  position: relative;
  height: 140px;
  .order-logistics-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .order-logistics-top-content {
    position: relative;
    z-index: 1;
    padding: 0 24px;
    .order-status {
      line-height: 18px;
      padding-top: 15px;
      padding-bottom: 12px;
      text-align: center;
      font-size: 18px;
      color: white;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
    .order-info {
      display: flex;
      .order-goods {
        flex: 0 0 80px;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #ccc;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          bottom: 0;
          left: 0;
          text-align: center;
          width: 100%;
          height: 24px;
          line-height: 24px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 13px;
        }
      }
      .order-logistics {
        margin-left: 20px;
        color: white;
        font-size: 13px;
        div {
          margin-top: 8px;
          line-height: 18px;
          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
  }
}

.order-logistics-detail {
  width: 363px;
  margin: 0 auto;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  padding-top: 7.5px;
  .order-logistics-detail-title {
    padding-left: 8px;
    color: #333333;
    font-size: 15px;
    line-height: 21px;
  }
  .order-logistics-list {
    margin-top: 40px;
    padding-left: 27px;
    .order-logistics-item {
      padding-left: 25px;
      padding-bottom: 28px;
      color: #999;
      border-left: 1px solid #e5e5e5;
      &:last-child {
        border-left: none;
      }
      .order-logistics-content {
        position: relative;
        top: -10.5px;
        &.active {
          .pint {
            color: #ff6a00;
            background: none;
            width: 18px;
            height: 18px;
          }
          .order-logistics-item-title {
            color: #ff6a00;
          }
          .order-logistics-item-content {
            color: #333333;
          }
          .order-logistics-item-time {
            color: #333333;
          }
        }
      }
      .pint {
        position: absolute;
        left: -25px;
        top: 10.5px;
        transform: translateX(-50%) translateY(-50%);
        width: 7.5px;
        height: 7.5px;
        border-radius: 100%;
        background: #e5e5e5;
      }
      .logistics-status-icon {
        width: 18px;
        height: 18px;
        position: absolute;
        left: 3px;
        top: 5px;
        transform: translateX(-50%) translateY(-50%);
      }
      .order-logistics-item-title {
        font-size: 15px;
        line-height: 21px;
      }
      .order-logistics-item-content {
        margin-top: 4px;
        font-size: 13px;
        line-height: 18.5px;
      }
      .order-logistics-item-time {
        margin-top: 2px;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>
