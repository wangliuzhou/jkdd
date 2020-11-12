<template>
  <div class="page-login">
    <template v-if="needWechatLogin">
      登录中...
    </template>
    <template v-else>
      <van-field v-model="mobile" colon placeholder="请输入" label="手机号" />
      <van-field
        v-model="code"
        colon
        placeholder="请输入"
        maxlength="6"
        label="验证码"
      />
      <!-- <van-field v-model="userId" colon placeholder="请输入" label="userId" />
      <van-field
        v-model="storesysId"
        colon
        placeholder="请输入"
        label="storesysId"
      />
      <van-field
        v-model="accessToken"
        colon
        placeholder="请输入"
        label="accessToken"
      />
      <van-field
        v-model="tokenTime"
        colon
        placeholder="请输入"
        label="tokenTime"
      />
      <van-field
        v-if="openidStr"
        v-model="openidStr"
        colon
        placeholder="请输入"
        label="openidStr"
      /> -->
      <van-button type="primary" block @click="login">登录</van-button>
    </template>
  </div>
</template>
<script>
import { Toast } from "vant";
import { CookieSet } from "@/utils/cookie";
import { wechatLogin } from "@/utils/account";
import { isWechat } from "@/utils/index";
import Cfg from "@/config/index";

export default {
  props: {
    storesysId: String,
    redirectUrl: String,
    bindPhone: Boolean,
    openidStr: String
  },
  data() {
    return {
      userId: "294ZKOG2WMNGLL1ZJ31L",
      storeId: "TSRORVZ17ZXD9",
      accessToken: "93c51a983ca05d81b3acab5971df0fed86254bbc",
      tokenTime: "1604807480963",
      mobile: "15757185531",
      code: "123456"
    };
  },
  computed: {
    needWechatLogin() {
      return !this.bindPhone && isWechat;
    }
  },
  mounted() {
    // 如果是微信环境自动登录
    if (this.needWechatLogin) {
      wechatLogin(this.redirectUrl);
    }
  },
  methods: {
    // login() {
    //   let {
    //     userId,
    //     storeId,
    //     storesysId,
    //     accessToken,
    //     tokenTime,
    //     redirectUrl
    //   } = this;

    //   CookieSet("userId", userId);
    //   CookieSet("userInfo", {
    //     userInnerId: 2,
    //     userUnionId: "oJjHK6mVxKdg6iC0z1ZiPeYF4hXE",
    //     userAvatar: "wechatimage/2020/09/08/j3odql6w54_wximage.png",
    //     userPhone: "15757185531",
    //     userNickname: "smile_微笑",
    //     userGender: 1,
    //     userName: "陶新华",
    //     userBirthday: 780336000000
    //   });
    //   CookieSet("accessToken", accessToken);
    //   CookieSet("tokenTime", tokenTime);

    //   Toast("登录成功");
    //   setTimeout(() => {
    //     if (redirectUrl) {
    //       this.$replace(redirectUrl);
    //     } else {
    //       this.$replace("/");
    //     }
    //   }, 800);
    // }
    login() {
      let { mobile, code, openidStr, redirectUrl, bindPhone } = this;
      let postUrl, postData;

      if (bindPhone) {
        postUrl = "/sysWechatThirdAuth/woaLoginBandMobile";
        postData = {
          mobile,
          code,
          openidStr,
          storeOutId: Cfg.mainStoreId
        };
      } else {
        postUrl = "/sysWechatThirdAuth/woaLoginByMobile";
        postData = {
          mobile,
          code,
          storeOutId: Cfg.mainStoreId
        };
      }

      this.$fetchPost(postUrl, postData).then(
        ({ data: { account, token, tokenTime } }) => {
          CookieSet("userId", account.userUnionId);
          CookieSet("userInfo", account);
          CookieSet("accessToken", token);
          CookieSet("tokenTime", tokenTime);

          Toast("登录成功");

          setTimeout(() => {
            if (redirectUrl) {
              this.$replace(redirectUrl);
            } else {
              this.$replace("/");
            }
          }, 800);
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.page-login {
}
</style>
