const { VUE_APP_API_ENV } = process.env;
const CONFIG = {
  dev: {
    url_map: {
      "/store/": ["http://192.168.100.114:8080"],
      "/oss/": ["http://192.168.100.114:8081"],
      "/client/": ["http://192.168.100.114:8083"],
      "/storage/": ["http://192.168.100.114:8084"],
      "/sysBackendCategoryAttr/": ["http://192.168.100.142:8080"],
      "/brand/": ["http://192.168.100.142:8080"],
      "/tenantUnit/": ["http://192.168.100.142:8080"],
      "/tenantBackCate/": ["http://192.168.100.142:8080"],
      "/tenantFrontCate/": ["http://192.168.100.142:8080"],
      "/frontBackCate/": ["http://192.168.100.142:8080"],
      "/mobile/tenantProduct/": ["http://192.168.100.142:8080"],
      "/sysAccount/": ["http://192.168.100.142:8088"],
      "/storesysBaseInfo/": ["http://192.168.100.142:8088"],
      "/sysWechatappLiveroom/": ["http://192.168.100.142:8080"],
      "/tenantMemberLevel/": ["http://192.168.100.142:8080"],
      "/tenantProductUserLabel/": ["http://192.168.100.142:8080"],
      "/sysWechatThirdAuthInfo/": ["http://192.168.100.142:8080"],
      "/sysWechatThirdAuth/": ["http://192.168.100.142:8088"],
      "/tenantSingleProduct/": ["http://192.168.100.114:8080"],
      "/tenantEmployeeAccount/": ["http://192.168.100.142:8080"],
      "/sms/": ["http://192.168.100.142:8080"],
      "/order/": ["http://192.168.100.111:8086"]
    }
  },
  beta: {},
  prod: {
    url_map: {
      "/store/": ["https://saas.xzintl.com/api/store"],
      "/oss/": ["https://saas.xzintl.com/api/oss"],
      "/client/": ["https://saas.xzintl.com/api/client"],
      "/storage/": ["https://saas.xzintl.com/api/storage"],
      "/sysBackendCategoryAttr/": ["https://saas.xzintl.com/api/product"],
      "/brand/": ["https://saas.xzintl.com/api/product"],
      "/tenantUnit/": ["https://saas.xzintl.com/api/product"],
      "/tenantBackCate/": ["https://saas.xzintl.com/api/product"],
      "/tenantFrontCate/": ["https://saas.xzintl.com/api/product"],
      "/frontBackCate/": ["https://saas.xzintl.com/api/product"],
      "/mobile/tenantProduct/": ["https://saas.xzintl.com/api/product"],
      "/sysAccount/": ["https://saas.xzintl.com/api/system"],
      "/storesysBaseInfo/": ["https://saas.xzintl.com/api/system"],
      "/sysWechatappLiveroom/": ["https://saas.xzintl.com/api/product"],
      "/tenantMemberLevel/": ["https://saas.xzintl.com/api/product"],
      "/tenantProductUserLabel/": ["https://saas.xzintl.com/api/product"],
      "/sysWechatThirdAuthInfo/": ["https://saas.xzintl.com/api/product"],
      "/sysWechatThirdAuth/": ["https://saas.xzintl.com/api/system"],
      "/order/": ["https://saas.xzintl.com/api/order"]
    }
  }
};
let config = "";
if (["beta", "prod"].indexOf(VUE_APP_API_ENV) > -1) {
  config = CONFIG[VUE_APP_API_ENV];
} else {
  config = CONFIG["prod"];
}

export const getUrl = url => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  let domain = "";
  for (let key in config.url_map) {
    if (url.indexOf(key) === 0) {
      domain =
        config.url_map[key][
          Math.floor(Math.random() * config.url_map[key].length)
        ];
      break;
    }
  }
  return domain + url;
};
