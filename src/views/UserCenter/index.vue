<template>
  <div class="user-content-page">
    <CustomNavigation
      title="个人中心"
      :scrollTop="scrollTop"
    ></CustomNavigation>
    <div
      class="user-info-card"
      :style="{
        height: `${statusBarHeight + 187}px`,
        'padding-top': `${tabbarBarHeight + 15}px`
      }"
    >
      <div class="user-info">
        <div class="user-avatar-box">
          <!-- <van-image
            v-if="userInfo.userAvatar"
            :src="$ali(ossDomain + userInfo.userAvatar, 375)"
            class="user-avatar"
            :fit="calcImageStyle"
          /> -->
        </div>
        <div class="user-detail">
          <div class="user-name">
            <span class="name">{{
              !!userInfo ? userInfo.userNickname : "立即登录"
            }}</span>
            <IconFont
              type="iconhuiyuanma"
              fontStyle="font-size:15px;color:#ffffff;"
            />
          </div>
        </div>
        <!-- <AuthAll type="userInfo"></AuthAll> -->
      </div>
      <!-- <AuthAll type="phone"></AuthAll> -->
      <!-- <button v-if="{{!$state.userInfo.userAvatar}}" open-type="getUserInfo" class="get-user-info-btn" bindgetuserinfo="checkSession"></button> -->
      <!-- <button v-if="{{!$state.userInfo}}" open-type="getPhoneNumber" class="get-user-info-btn" style="z-index:4" bindgetphonenumber="checkSession"></button> -->
      <div class="member-card" @click="goMember">
        <div class="icon">{{ storeSysName }}</div>
        <div class="join-member">
          <IconFont
            type="iconhuiyuanxingbiao"
            fontStyle="font-size:15px;color:#ffffff"
          />
          <span class="text">{{
            isMmember === 2 ? "会员中心" : "成为会员"
          }}</span>
          <IconFont
            type="iconright"
            fontStyle="font-size:20rpx;color:#ffffff"
          />
        </div>
      </div>
      <!-- <image class="member-background-img" src="/assets/image/members/ordinary_radius_card.png" /> -->
      <!-- <image class="footer-img" src="/assets/image/members/footer_border.png" /> -->
    </div>
    <!-- <div class="balance-card">
    <div class="item">
      <div class="value">1800</div>
      <div class="label">积分</div>
    </div>
    <div class="item" bindtap="goPage" data-link="/pages/coupons/index">
      <div class="value">4</div>
      <div class="label">优惠券/码</div>
    </div>
    <div class="item">
      <div class="value">100.00</div>
      <div class="label">余额</div>
    </div>
  </div>-->
    <div class="order-card">
      <div class="header">
        <div
          class="left-label"
          @click="goPage({ path: '/orderList', activeIndex: undefined })"
        >
          我的订单
        </div>
        <div class="right-go-all">
          <text
            class="text"
            @click="goPage({ path: '/orderList', activeIndex: undefined })"
            >查看全部订单</text
          >
          <IconFont
            type="iconright"
            fontStyle="font-size:22rpx;color:#999999"
          />
        </div>
      </div>
      <div class="order-types">
        <div
          v-for="(item, index) in orderList"
          :key="index"
          class="item"
          @click="goPage({ path: item.link, activeIndex: item.activeIndex })"
        >
          <div
            v-if="item.num"
            class="order-num"
            :style="{ padding: `0 ${item.num > 9 ? '2px' : 0} ` }"
          >
            {{ item.num > 99 ? "99+" : item.num }}
          </div>
          <van-image :src="item.icon" class="icon" fit="aspectFill" />
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
      <!-- <AuthAll type="phone"></AuthAll> -->
    </div>
    <div class="function-card function-card-list-style">
      <div
        v-for="(item, index) in functionList"
        :key="index"
        class="item"
        @click="goPage({ path: item.link })"
      >
        <IconFont
          :type="item.icon"
          :fontStyle="{
            'font-size': item.fontSize || '15px',
            color: '#303133'
          }"
        />
        <div class="label">
          <div class="text">{{ item.label }}</div>
          <IconFont type="iconright" fontStyle="font-size:12px;color:#999999" />
        </div>
        <button
          v-if="item.label === '客服聊天'"
          class="contact-btn"
          open-type="contact"
        ></button>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script>
import { Toast } from "vant";
// import IconFont from "@/components/IconFont";
import Tabbar from "@/components/Tabbar";
import CustomNavigation from "@/components/CustomNavigation";
export default {
  data() {
    return {
      orderList: [
        {
          icon: "/assets/images/order/payment.png",
          link: "/orderList",
          label: "待付款",
          activeIndex: 1
        },
        {
          icon: "/assets/images/order/send.png",
          link: "/orderList",
          label: "待发货",
          activeIndex: 2
        },
        {
          icon: "/assets/images/order/take.png",
          link: "/orderList",
          label: "待收货",
          activeIndex: 3
        },
        {
          icon: "/assets/images/order/comments.png",
          link: "/orderList",
          label: "评价",
          activeIndex: 4
        },
        {
          icon: "/assets/images/order/refund.png",
          link: "/orderList",
          label: "退款/售后",
          activeIndex: 5
        }
      ],
      functionList: [
        // {
        //   icon: "/assets/image/userCenter/renwuzhongxin.png",
        //   label: "任务中心",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/pintuan.png",
        //   label: "拼团",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/renrenfenxiao.png",
        //   label: "象征销客",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/zhekou.png",
        //   label: "折扣",
        //   link: "/page/index/index"
        // },
        {
          icon: "iconyouhuiquan",
          label: "我的优惠券",
          link: "/coupons"
        },
        {
          img: "/assets/image/userCenter/shouhuodizhi.png",
          icon: "iconweizhi",
          label: "收货地址",
          link: "/addressList",
          fontSize: "36rpx"
        },
        {
          img: "/assets/image/userCenter/kefuliaotian.png",
          icon: "iconkefuliaotian1",
          label: "客服聊天",
          link: "/index"
        }
        // {
        //   icon: "/assets/image/userCenter/zhanghaoyuanquan.png",
        //   label: "账号与安全",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/wodeshoucang.png",
        //   label: "我的收藏",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/wodemendian.png",
        //   label: "我的门店",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/wodeyuyue.png",
        //   label: "服务预约",
        //   link: "/page/index/index"
        // },
        // {
        //   icon: "/assets/image/userCenter/tuijian.png",
        //   label: "推荐",
        //   link: "/page/index/index"
        // }
      ],
      statusBarHeight: 20,
      tabbarBarHeight: 20 + 45,
      ratio: 2,
      scrollTop: 0,
      ossDomain: "",
      dpr: 2,
      storeOuterId: "TSRORVZ17ZXD9",
      storeSysName: "",
      isMmember: 0,
      orderNums: {},
      isLogin: true,
      userInfo: {
        userNickname: ""
      }
    };
  },
  components: {
    Tabbar,
    CustomNavigation
  },
  onShow() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      if (this.isLogin) {
        this.getMemberDetail();
        this.getOrderNum();
      }
    },
    onPageScroll({ scrollTop }) {
      this.scrollTop = scrollTop;
    },
    goPage(obj) {
      console.log(obj);
      if (obj.path === "/orderList") {
        this.$push(`${obj.path}?activeIndex=${obj.activeIndex}`);
      } else {
        this.$push(obj.path);
      }
    },
    goMember() {
      const { isMmember } = this;
      if (isMmember === 0) {
        Toast("商家未设置会员");
        return;
      }
      this.$push("/pages/membersCenter/index");
    },
    // 获取会员卡详情
    async getMemberDetail() {
      const { storeOuterId } = this;
      const { data } = await this.$fetchGet(
        "/client/mobile/tenantMemberCardOption/isMemberCard",
        {
          storeOuterId
        }
      );
      this.isMmember = data;
    },
    // 订单数量
    async getOrderNum() {
      const { storeOuterId, orderList } = this;
      const { data } = await this.$fetchGet(
        "/order/mobile/tenantOrder/findOrderCount",
        {
          storeOuterId
        }
      );
      orderList[0].num = data["stayPayment"];
      orderList[1].num = data["stayShipments"];
      orderList[2].num = data["stayReceiving"];
      orderList[3].num = data["evaluate"];
      orderList[4].num = data["afterSale"];
      this.orderList = orderList;
    },
    // 登录回调
    loginCallback() {
      this.getMemberDetail();
      this.getOrderNum();
    }
  }
};
</script>
<style lang="less" scoped>
.user-content-page {
  background: rgba(248, 248, 248, 1);
  padding-bottom: calc(env(safe-area-inset-bottom) + 58px);
  min-height: calc(100vh - env(safe-area-inset-bottom) - 58px);
  .user-info-card {
    position: relative;
    width: 100%;
    height: 187px;
    background: rgba(55, 61, 65, 1);
    padding: 0 12px;
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
      position: relative;
      display: flex;
      align-items: center;
      // height: 100%;

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
      align-items: center;
      width: 345px;
      height: 42px;
      border-radius: 8px 8px 0 0;
      transform: translate(-50%, 0);
      box-sizing: border-box;
      padding: 6px 14px;
      z-index: 1;
      background: linear-gradient(to right, #f5b482, #f0833b);

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
        font-size: 213px;
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
    position: relative;
    background: #ffffff;
    width: 363px;
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
        height: 18px;
        line-height: 18px;

        .text {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
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
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 20%;
        height: 100%;

        .order-num {
          position: absolute;
          right: 16px;
          top: 13px;
          min-width: 14px;
          height: 14px;
          line-height: 14px;
          background: #ff6a00;
          border-radius: 14px;
          text-align: center;
          // padding: 0 4rpx;
          font-size: 10px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }

        .label {
          margin-top: 16px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 18px;
          color: #666666;
        }

        .icon {
          width: 28px;
          height: 28px;
        }
      }
    }
  }

  .function-card {
    width: 363px;
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
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 25%;
      height: 95px;
      background: rgba(255, 255, 255, 1);

      .label {
        margin-top: 16px;
        height: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 18px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }

      .icon {
        width: 40px;
        height: 40px;
      }

      .contact-btn {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
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

        .icon {
          width: 24px;
          height: 24px;
        }

        .label {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 13px;
          font-size: 15px;

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
              margin-right: 13px;
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
