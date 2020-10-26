import cfg from "@/config/index";
import {
  CookieSet,
  StoresysCookieSet,
  StoresysCookieGet
} from "@/utils/cookie";
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
export const getRequestHeader = () => {
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
  if (storesysId) {
    // 如果是http://shop_425zp1q60o.m.xzintl.com/格式的域名
    CookieSet("storesysId", storesysId);
    StoresysCookieSet("userId", "oJjHK6mVxKdg6iC0z1ZiPeYF4hXE");
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
    StoresysCookieSet(
      "accessToken",
      "6826ac62078d6ddebc54c37c3e5e0ec44e2e16f7"
    );
    StoresysCookieSet("storeId", "TSRORVZ17ZXD9");
    StoresysCookieSet("storesysId", storesysId);
    StoresysCookieSet("tokenTime", 1603933951541);
  } else {
    // http://cashier.xzintl.com/pay/orderSettle
  }
};
