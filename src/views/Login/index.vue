<template>
  <div class="page-login">
    <van-field v-model="userId" colon placeholder="请输入" label="userId" />
    <van-field v-model="storeId" colon placeholder="请输入" label="storeId" />
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

    <van-button type="primary" block @click="login">登录</van-button>
  </div>
</template>
<script>
import { Toast } from "vant";
import {
  CookieSet,
  StoresysCookieSet,
  StoresysCookieGet
} from "@/utils/cookie";

export default {
  props: {
    storesysId: String
  },
  data() {
    return {
      userId: "294ZKOG2WMNGLL1ZJ31L",
      storeId: "TSRORVZ17ZXD9",
      accessToken: "d2b0f03e45437a186b12318b1900f004f7001775",
      tokenTime: "1604296670032"
    };
  },
  methods: {
    login() {
      let { userId, storeId, storesysId, accessToken, tokenTime } = this;
      let { redirectUrl } = this.$route.query;
      redirectUrl = decodeURIComponent(redirectUrl);

      StoresysCookieSet("userId", userId);
      StoresysCookieSet("userInfo", {
        userInnerId: 2,
        userUnionId: "oJjHK6mVxKdg6iC0z1ZiPeYF4hXE",
        userAvatar: "wechatimage/2020/09/08/j3odql6w54_wximage.png",
        userPhone: "15757185531",
        userNickname: "smile_微笑",
        userGender: 1,
        userName: "陶新华",
        userBirthday: 780336000000
      });
      StoresysCookieSet("accessToken", accessToken);
      StoresysCookieSet("storeId", storeId);
      StoresysCookieSet("storesysId", storesysId);
      StoresysCookieSet("tokenTime", tokenTime);

      Toast("登录成功");

      setTimeout(() => {
        if (redirectUrl) {
          this.$replace(redirectUrl);
        } else {
          this.$replace("/");
        }
      }, 800);
    }
  }
};
</script>
<style lang="less" scoped>
.page-login {
}
</style>
