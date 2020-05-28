import Cookie from "js-cookie";
import cfg from "@/config/index";

export const getUserId = () => {
  return Cookie.get("userId") || 0;
};

export const isLogin = () => {
  return !!getUserId();
};

export const needLogin = to => {
  return to && to.meta && to.meta.needLogin === true && !isLogin();
};

//生成请求头
export const genRequestHeader = () => {
  return {
    "x-user-id": Cookie.get("userId") || "",
    "x-access-token": Cookie.get("accessToken") || ""
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
