import { CookieGet } from "@/utils/cookie";
import storesys from "@/utils/storesys";
import router from "@/utils/router";

export const getUserId = () => {
  return CookieGet("userId") || 0;
};

const account = {};
// 用户id
Object.defineProperty(account, "userId", {
  get() {
    return getUserId();
  }
});
// 是否登录
Object.defineProperty(account, "isLogin", {
  get() {
    return !!getUserId();
  }
});
export default account;

// 判断路由是否需要登录
export const needLogin = to => {
  return to && to.meta && to.meta.needLogin === true && !account.isLogin;
};

//登录
export const login = redirectUrl => {
  redirectUrl = redirectUrl || window.location.href;

  router.push({
    path: "/login",
    query: {
      storesysId: storesys.storesysId,
      redirectUrl: encodeURIComponent(redirectUrl)
    }
  });
  // let redirect_uri = `${cfg.loginRedirectUrl}?appid=${
  //   cfg.appId
  // }&terminal=terminal&success_url=${encodeURIComponent(
  //   redirectUrl
  // )}&error_url=${encodeURIComponent(
  //   `${location.origin}/loginError`
  // )}&scope=snsapi_userinfo`;

  // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
  //   cfg.appId
  // }&redirect_uri=${encodeURIComponent(
  //   redirect_uri
  // )}&response_type=code&scope=snsapi_userinfo&state=state&component_appid=wx52e6a157b436d353#wechat_redirect`;
};
