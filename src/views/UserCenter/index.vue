<template>
  <div class="user-content-page">
    <div class="user-info-card">
      <div class="user-info">
        <div class="user-avatar-box">
          <!-- <open-data
            type="userAvatarUrl"
            style="width:100%;height:100%;display:block"
          ></open-data> -->
        </div>
        <div class="user-detail">
          <div class="user-name">
            <span class="name">立即登录</span>
            <IconFont
              type="iconhuiyuanma"
              fontStyle="font-size:15px;color:#ffffff;"
            />
          </div>
        </div>
      </div>
      <div class="member-card" @click="goMember">
        <div class="icon">NEELLY</div>
        <div class="join-member">
          <IconFont
            type="iconjisushouhou-yinka"
            fontStyle="font-size:13px;color:#ffffff"
          />
          <span class="text">成为会员</span>
          <IconFont type="iconright" fontStyle="font-size:10px;color:#ffffff" />
        </div>
      </div>
      <van-image
        class="member-background-img"
        :src="require('@/assets/images/members/ordinary_radius_card.png')"
      />
      <van-image
        class="footer-img"
        :src="require('@/assets/images/members/footer_border.png')"
      />
    </div>
    <div class="balance-card">
      <div class="item">
        <div class="value">1800</div>
        <div class="label">积分</div>
      </div>
      <div class="item">
        <div class="value">4</div>
        <div class="label">优惠券/码</div>
      </div>
      <div class="item">
        <div class="value">100.00</div>
        <div class="label">余额</div>
      </div>
    </div>
    <div class="order-card">
      <div class="header">
        <div class="left-label">我的订单</div>
        <div class="right-go-all">
          <span class="span">查看全部订单</span>
          <IconFont type="iconright" fontStyle="font-size:11px;color:#666666" />
        </div>
      </div>
      <div class="order-types">
        <div
          v-for="item of orderList"
          :key="item.label"
          class="item"
          @click="goPage(item.link, item.activeIndex)"
        >
          <van-image
            mode="aspectFill"
            :src="require('@/assets/images/order/' + item.icon + '.png')"
            class="icon"
          />
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="function-card">
      <div
        v-for="(item, index) of functionList"
        :key="index"
        class="item"
        :class="{ block: (index + 1) % 3 === 0 }"
        @click="goPage(item.link)"
      >
        <IconFont :type="item.icon" fontStyle="font-size:28px;" />
        <div class="label">
          <div class="span">{{ item.label }}</div>
          <!-- <div class="value-and-icon">
            <div class="value">内容</div>
            <IconFont type="iconright" fontStyle="font-size:26rpx;color:#999999" />
          </div> -->
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script>
import IconFont from "@/components/IconFont";
import Tabbar from "@/components/Tabbar";
export default {
  data() {
    return {
      orderList: [
        {
          icon: "payment",
          link: "/pages/orderList/index",
          label: "待付款",
          activeIndex: 1
        },
        {
          icon: "send",
          link: "/pages/orderList/index",
          label: "待发货",
          activeIndex: 2
        },
        {
          icon: "take",
          link: "/pages/orderList/index",
          label: "待收货",
          activeIndex: 3
        },
        {
          icon: "comments",
          link: "/pages/orderList/index",
          label: "评价",
          activeIndex: 4
        },
        {
          icon: "refund",
          link: "/pages/orderList/index",
          label: "退款/售后",
          activeIndex: 5
        }
      ],
      functionList: [
        {
          icon: "icondaifahuo",
          label: "任务中心",
          link: "/page/index/index"
        },
        {
          icon: "icondaifahuo",
          label: "任务中心",
          link: "/page/index/index"
        },
        {
          icon: "icondaifahuo",
          label: "任务中心",
          link: "/page/index/index"
        },
        {
          icon: "icondaifahuo",
          label: "任务中心",
          link: "/page/index/index"
        },
        {
          icon: "icondaifahuo",
          label: "任务中心",
          link: "/page/index/index"
        },
        {
          icon: "icondaifahuo",
          label: "任务中心",
          link: "/page/index/index"
        }
      ]
    };
  },
  components: {
    IconFont,
    Tabbar
  },
  mounted() {
    this.setTitle();
  },
  methods: {
    goPage() {},
    goMember() {},
    getUserInfo() {},
    setTitle() {
      // let { item } = this;
    }
  }
};
</script>
<style lang="less" scoped>
.user-content-page {
  .user-info-card {
    position: relative;
    width: 100%;
    height: 187px;
    background: rgba(55, 61, 65, 1);
    padding: 0 22px;
    box-sizing: border-box;
    overflow: hidden;

    .get-user-info-btn {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 3;
      opacity: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      height: 100%;

      .user-avatar-box {
        width: 60px;
        height: 60px;
        background: #ffffff;
        border-radius: 50%;
        overflow: hidden;

        .user-avatar {
          width: 100%;
          height: 100%;
        }
      }

      .user-detail {
        margin-left: 12px;
        flex-grow: 1;
        width: 0;

        .user-name {
          display: flex;
          align-items: center;

          .name {
            margin-right: 10px;
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }
        }
      }

      &.left-name-right-avatar {
        .user-avatar-box {
          order: 1;
        }
      }

      &.vertical-center {
        flex-direction: column;
        justify-content: center;

        .user-detail {
          width: 100%;
          flex-grow: 0;
          margin-top: 10px;

          .user-name {
            justify-content: center;
          }
        }
      }
    }

    .member-card {
      position: absolute;
      bottom: 0;
      left: 50%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 345px;
      height: 42px;
      border-radius: 8px;
      transform: translate(-50%, 0);
      box-sizing: border-box;
      padding: 6px 14px;
      z-index: 1;

      .icon {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }

      .join-member {
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          color: rgba(255, 255, 255, 1);
          margin: 0 5px;
        }
      }
    }

    .member-background-img {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 345px;
      height: 42px;
      transform: translate(-50%, 0);
      z-index: 0;
    }

    .footer-img {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 15px;
      width: 100%;
      z-index: 1;
    }

    // &::after {
    //   content: "";
    //   position: absolute;
    //   bottom: -239rpx;
    //   left: -35rpx;
    //   width: 280rpx;
    //   height: 250rpx;
    //   background: #ffffff;
    //   transform: rotate(5deg);
    // }

    // &::before {
    //   content: "";
    //   position: absolute;
    //   bottom: -239rpx;
    //   right: -35rpx;
    //   width: 280rpx;
    //   height: 250rpx;
    //   background: #ffffff;
    //   transform: rotate(-5deg);
    //   z-index: 1;
    // }
  }

  .balance-card {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 69px;

    .item {
      width: 33%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .label {
        height: 19px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(144, 147, 153, 1);
        line-height: 19px;
      }

      .value {
        height: 24px;
        font-size: 21px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(48, 49, 51, 1);
        line-height: 24px;
      }
    }
  }

  .order-card {
    background: #ffffff;
    width: 368px;
    height: 140px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 10px auto 0;
    box-sizing: border-box;
    padding: 0 6px;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      .left-label {
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }

      .right-go-all {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 19px;
        line-height: 19px;

        .text {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgb(102, 102, 102);
          margin-right: 5px;
        }
      }
    }

    .order-types {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: nowrap;
      width: 100%;
      height: 95px;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 20%;
        height: 100%;

        .label {
          margin-top: 17px;
          height: 19px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 19px;
        }

        .icon {
          width: 28px;
          height: 28px;
        }
      }
    }
  }

  .function-card {
    width: 368px;
    margin: 10px auto 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    overflow: hidden;
    background: #ffffff;
    padding: 0 6px;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 20%;
      height: 95px;
      background: rgba(255, 255, 255, 1);

      .label {
        margin-top: 17px;
        height: 19px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 19px;
      }

      .icon {
        font-size: 28px;
      }
    }

    &.function-card-list-style {
      border-radius: 0;
      margin: 10px 0 0;
      width: 100%;
      padding: 0 0 0 12px;
      background: #ffffff;

      .item {
        width: 100%;
        height: 48px;
        justify-content: flex-start;
        flex-direction: row;
        border-bottom: 1px solid rgba(238, 238, 238, 1);

        .label {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 14px;
          font-size: 17px;

          .text {
          }

          .value-and-icon {
            display: flex;
            align-items: center;
            justify-content: center;

            .value {
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              margin-right: 8px;
            }
          }
        }

        .icon {
          font-size: 20px;
        }

        &:last-child {
          border: none;
        }

        &.block {
          margin-bottom: 8px;
          border: none;
          position: relative;

          &::after {
            content: "";
            height: 8px;
            width: 375px;
            position: absolute;
            bottom: -8px;
            left: -12px;
            background: #f8f8f8;
          }
        }
      }
    }
  }
}
</style>
