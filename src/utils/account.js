import cfg from "@/config/index";
import {
  CookieSet,
  StoresysCookieSet,
  StoresysCookieGet
} from "@/utils/cookie";
import storesys from "@/utils/storesys";
import router from "@/utils/router";

export const getUserId = () => {
  return StoresysCookieGet("userId") || 0;
};

export const isLogin = () => {
  return !!getUserId();
};

// 判断路由是否需要登录
export const needLogin = to => {
  return to && to.meta && to.meta.needLogin === true && !isLogin();
};

//生成请求头
export const getRequestHeader = () => {
  return {
    "x-store-id": cfg.mainStoreId,
    "x-storesys-id": storesys.storesysId,
    "x-user-id": StoresysCookieGet("userId"),
    "x-access-token": StoresysCookieGet("accessToken"),
    "x-token-time": StoresysCookieGet("tokenTime")
  };
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
