import Cookie from "js-cookie";
import cfg from "@/config/index";
import { getUUID } from "@/utils/index";

export const getUserId = () => {
  return Cookie.get("userId") || 0;
};

export const isLogin = () => {
  return !!getUserId();
};

export const needLogin = to => {
  return to && to.meta && to.meta.needLogin === true && !isLogin();
};

export const initContext = () => {
  let clientToken = localStorage.getItem("client_token");
  if (!clientToken) {
    localStorage.setItem("client_token", getUUID());
  }
};

//生成请求头
export const genRequestHeader = () => {
  return {
    "x-user-id": Cookie.get("userId") || "VLZWJWNQLLQW3L63J7D1",
    "x-access-token":
      Cookie.get("accessToken") || "57830ba4b6ef49031d936a0156893d2537605e8d",
    "x-storesys-id": "E7M8VVW8OP", //"425ZP1Q60O",
    "x-token-time": 1594867303938
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
