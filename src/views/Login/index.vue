<template>
  <div class="page-login">
    <h1>手机号快捷登录</h1>
    <div class="form">
      <div class="form-item">
        <input
          type="tel"
          v-model="mobile"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </div>
      <div class="form-item">
        <input
          type="tel"
          v-model="code"
          maxlength="4"
          placeholder="请输入验证码"
        />
        <!-- 重新发送(58s） -->
        <button class="getcode-btn" disabled @click="getCode">
          发送验证码
        </button>
      </div>
      <button class="login-btn" disabled @click="login">确定</button>
    </div>
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
      // userId: "294ZKOG2WMNGLL1ZJ31L",
      // storeId: "TSRORVZ17ZXD9",
      // accessToken: "93c51a983ca05d81b3acab5971df0fed86254bbc",
      // tokenTime: "1604807480963",
      // mobile: "15757185531",
      // code: "123456"
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
    getCode() {
      console.log("获取验证码");
    },
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
  height: 100vh;
  background: white;
  h1 {
    width: 310px;
    margin: 0 auto;
    padding: 42px 0;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 34px;
  }
  .form {
    .form-item {
      margin: 0 auto;
      margin-top: 15px;
      width: 310px;
      height: 42px;
      background: #fff5ee;
      border-radius: 5px;
      position: relative;
      &:first-child {
        margin-top: 0;
      }
      input {
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: none;
        border: none;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        box-sizing: border-box;
        padding: 0 14px;
        outline: none;
        &::-webkit-input-placeholder {
          color: #bfb8b8;
        }
      }
      .getcode-btn {
        position: absolute;
        width: 106px;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        border: none;
        outline: none;
        background: none;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff6a00;
        line-height: 20px;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          border-left: 1px solid #ff6a00;
          height: 15px;
        }
        &[disabled] {
          color: #909399;
        }
      }
    }
    .login-btn {
      display: block;
      margin: 0 auto;
      margin-top: 42px;
      width: 310px;
      height: 44px;
      background: #ff6a00;
      border-radius: 24px;
      border: none;
      color: white;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      outline: none;
      &[disabled] {
        background: #e5e5e5;
      }
    }
  }
}
</style>
