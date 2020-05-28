const { VUE_APP_API_ENV } = process.env;

const Config = {
  base: {
    appId: "wx1018d54aa9dbc9d7",
    loginRedirectUrl: "http://agent.xzintl.com/api/salesmanInfo/WeChatCallBack"
  },
  dev: {
    appId: "wx1018d54aa9dbc9d7",
    loginRedirectUrl: "http://agent.xzintl.com/api/salesmanInfo/WeChatCallBack1"
  },
  beta: {},
  pro: {
    appId: "wx1018d54aa9dbc9d7",
    loginRedirectUrl: "http://agent.xzintl.com/api/salesmanInfo/WeChatCallBack"
  }
};

export default Object.assign({}, Config.base, Config[VUE_APP_API_ENV || "pro"]);
