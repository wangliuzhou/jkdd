<template>
  <div class="member-center-page">
    <CustomNavigation title="会员中心" back home></CustomNavigation>
    <div class="member-header">
      <div class="user-card">
        <div class="bg-wrap" :style="{ height: `${statusBarHeight + 118}px` }">
          <div class="member-card-bg-color"></div>
        </div>
        <div
          class="user-info"
          :style="{ 'padding-top': `${statusBarHeight + 8}px` }"
        >
          <div class="user-avatar-box">
            <van-image
              v-if="userInfo.userAvatar"
              :src="$ali(userInfo.userAvatar, 120)"
              class="user-avatar"
              fit="cover"
            />
          </div>
          <span class="user-name">{{
            !!userInfo.userNickname ? userInfo.userNickname : "立即登录"
          }}</span>
        </div>
        <CardList @goJoinMember="goJoinMember" :cardList="cardList"></CardList>
      </div>
    </div>
    <div class="privilege-wrap">
      <div class="privilege-header">会员卡权益</div>
      <div class="privilege-list">
        <div v-for="(item, index) in privilegeList" :key="index" class="item">
          <div class="icon-wrap">
            <van-image :src="item.icon" class="icon" fit="contain" />
          </div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="growth-task">
      <div class="growth-task-header">成长任务</div>
      <div class="task-list">
        <div class="item">
          <div class="detail">
            <div class="label">购买商品</div>
            <div class="remarks">购买商品可获得积分</div>
          </div>
          <div class="btn" @click="goHome">去完成</div>
        </div>
      </div>
    </div>
    <div v-if="!isLogin" class="no-auth" @click="goLogin"></div>
    <CouponsModal ref="couponsModal" />
  </div>
</template>
<script>
import CustomNavigation from "@/components/CustomNavigation";
import CouponsModal from "./components/CouponsModal";
import CardList from "./components/CardList";
import jifenbeishuaiIcon from "@/assets/images/members/icon/jifenbeishuai.png";
import songyouhuiquanIcon from "@/assets/images/members/icon/songyouhuiquan.png";
import songjifenIcon from "@/assets/images/members/icon/songjifen.png";
import songzengpinIcon from "@/assets/images/members/icon/songzengpin.png";
import { Toast } from "vant";
import Cfg from "@/config/index";
import account, { login } from "@/utils/account";

export default {
  components: { CustomNavigation, CouponsModal, CardList },
  data() {
    return {
      privilegeList: [
        {
          icon: jifenbeishuaiIcon,
          label: "积分倍率"
        },
        {
          icon: songyouhuiquanIcon,
          label: "送优惠券"
        },
        {
          icon: songjifenIcon,
          label: "送积分"
        },
        {
          icon: songzengpinIcon,
          label: "送赠品"
        }
        // {
        // 	icon: "/assets/image/members/icon/songhaoyoutiyanka.png",
        // 	label: "送好友体验卡",
        // },
        // {
        // 	icon: "/assets/image/members/icon/dazhe.png",
        // 	label: "打折",
        // },
        // {
        // 	icon: "/assets/image/members/icon/baoyou.png",
        // 	label: "包邮",
        // },
        // {
        // 	icon: "/assets/image/members/icon/youxianfahuo.png",
        // 	label: "优先发货",
        // },
        // {
        // 	icon: "/assets/image/members/icon/jisushouhou.png",
        // 	label: "急速售后",
        // },
        // {
        // 	icon: "/assets/image/members/icon/jisukefu.png",
        // 	label: "急速客服",
        // },
      ],
      statusBarHeight: 60,
      detail: {},
      cardList: [{}],
      userInfo: {},
      storeOuterId: Cfg.mainStoreId,
      isLogin: account.isLogin
    };
  },
  mounted() {
    if (!account.isLogin) {
      this.goLogin();
      return;
    }
    this.getMemberDetail();
  },
  computed: {},
  methods: {
    goLogin() {
      login();
    },
    goJoinMember(e) {
      const { userGrowthValue, memberLevelScore, memberLevelInfoForce } = e;
      if (userGrowthValue < memberLevelScore) {
        Toast("您的成长值不够哦~");
        return;
      }
      if (memberLevelInfoForce === 1) {
        this.$push("/pages/joinMember/index");
      } else {
        this.getMemberCard();
      }
    },
    // 领取会员卡
    async getMemberCard() {
      const { storeOuterId } = this;
      Toast.loading({
        forbidClick: true
      });
      try {
        const { data, code } = await this.$fetchPost(
          "/client/mobile/tenantMemberCardOption/getMemberCard",
          {
            storeOuterId: storeOuterId
          }
        );
        Toast.clear();
        Toast("领取成功!");
        //弹窗
        if (code === 200 && Array.isArray(data) && data.length > 0) {
          this.$refs.couponsModal.showModal(data);
        }
        this.getMemberDetail();
      } catch (err) {
        Toast.clear();
      }
    },
    // 获取会员卡详情
    async getMemberDetail() {
      const { storeOuterId } = this;
      const { data } = await this.$fetchGet(
        "/client/mobile/tenantMemberCardOption/isMemberCardOption",
        {
          storeOuterId
        }
      );
      this.cardList = data;
    },
    // 登录回调
    loginCallback() {
      this.isLogin = true;
      this.getMemberDetail();
    },
    goHome() {
      this.$replace("/");
    }
  }
};
</script>
<style lang="less" scoped>
.member-center-page {
  background: rgba(248, 248, 248, 1);
  padding-bottom: calc(env(safe-area-inset-bottom) + 48px);
  .member-header {
    .user-card {
      position: relative;
      width: 100%;
      overflow: hidden;

      .bg-wrap {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: -50%;
        width: 200%;
        height: 187px;
        // z-index: -1;
        border-radius: 0 0 50% 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .member-card-bg-color {
          width: 375px;
          height: 100%;
          background: #373d41;
        }

        .member-card-bg-img {
          width: 375px;
          height: 100%;
        }
      }

      .user-info {
        position: relative;
        display: flex;
        box-sizing: border-box;
        padding: 12px;
        align-items: center;

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

        .user-name {
          margin-left: 12px;
          flex-grow: 1;
          width: 0;
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
  }

  .privilege-wrap {
    margin-top: 30px;
    padding: 0 12px;

    .privilege-header {
      height: 15px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 15px;
    }

    .privilege-list {
      margin-top: 22px;
      display: flex;
      flex-wrap: wrap;
      background: white;
      border-radius: 5px;
      box-sizing: border-box;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 25%;
        height: 78px;

        .icon-wrap {
          width: 24px;
          height: 24px;

          .icon {
            width: 100%;
            height: 100%;
          }
        }

        .label {
          margin-top: 8px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
        }
      }
    }
  }

  .growth-task {
    margin-top: 30px;
    padding: 0 12px;

    .growth-task-header {
      height: 15px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 15px;
    }

    .task-list {
      margin-top: 22px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        width: 100%;
        height: 87px;
        background: #ffffff;
        padding: 0 12px 0 20px;
        box-sizing: border-box;

        .detail {
          height: 100%;

          .label {
            height: 21px;
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 21px;
            margin-top: 20px;
          }

          .remarks {
            height: 18px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 18px;
            margin-top: 8px;
          }
        }

        .btn {
          width: 72px;
          height: 28px;
          background: linear-gradient(313deg, #ffbf92 0%, #ff6a00 100%);
          border-radius: 14px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 28px;
          text-align: center;
        }
      }
    }
  }
  .no-auth {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
  }
}
</style>
