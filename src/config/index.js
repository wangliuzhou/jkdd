const { VUE_APP_API_ENV } = process.env;

const Config = {
  base: {
    appId: "wx1018d54aa9dbc9d7",
    mainStoreId: "TSRORVZ17ZXD9",
    loginRedirectUrl:
      "http://saastest.xzintl.com/api/system/sysWechatThirdAuth/woaLoginCallBack",
    shopOrigin: "http://shop_${storesysId}.m${test}.xzintl.com",
    cashierOrigin: "http://cashier${test}.xzintl.com",
    passportOrigin: "http://passport${test}.xzintl.com"
  },
  dev: {},
  beta: {
    appId: "wx1018d54aa9dbc9d7",
    loginRedirectUrl:
      "http://saastest.xzintl.com/api/system/sysWechatThirdAuth/woaLoginCallBack",
    shopOrigin: "http://shop_${storesysId}.m${test}.xzintl.com",
    cashierOrigin: "http://cashier${test}.xzintl.com",
    passportOrigin: "http://passport${test}.xzintl.com"
  },
  pro: {
    appId: "wx1018d54aa9dbc9d7",
    loginRedirectUrl:
      "http://saastest.xzintl.com/api/system/sysWechatThirdAuth/woaLoginCallBack"
  }
};

export default Object.assign({}, Config.base, Config[VUE_APP_API_ENV || "pro"]);
