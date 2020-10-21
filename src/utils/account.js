import cfg from "@/config/index";
import { StoresysCookieSet, StoresysCookieGet } from "@/utils/cookie";
import { storesysId } from "@/utils/storesys";

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
export const genRequestHeader = () => {
  return {
    "x-user-id": StoresysCookieGet("userId"),
    "x-access-token": StoresysCookieGet("accessToken"),
    "x-store-id": StoresysCookieGet("storeId"),
    "x-storesys-id": StoresysCookieGet("storesysId"),
    "x-token-time": StoresysCookieGet("tokenTime")
  };
};

//登录
export const login = redirectUrl => {
  redirectUrl = redirectUrl || window.location.href;

  let redirect_uri = `${cfg.loginRedirectUrl}?appid=${
    cfg.appId
  }&terminal=terminal&success_url=${encodeURIComponent(
    redirectUrl
  )}&error_url=${encodeURIComponent(
    `${location.origin}/loginError`
  )}&scope=snsapi_userinfo`;

  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    cfg.appId
  }&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&response_type=code&scope=snsapi_userinfo&state=state&component_appid=wx52e6a157b436d353#wechat_redirect`;
};

export const initContext = () => {
  StoresysCookieSet("userId", "oJjHK6mVxKdg6iC0z1ZiPeYF4hXE");
  StoresysCookieSet("accessToken", "c0f3a23e287a7fa1d16b10315647a34678500ae7");
  StoresysCookieSet("storeId", "TSRORVZ17ZXD9");
  StoresysCookieSet("storesysId", storesysId);
  StoresysCookieSet("tokenTime", 1602501188757);
};
