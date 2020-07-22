const ApiInfos = [
  { key: "/store/", service: "/api/store", dev: "http://192.168.100.142:8080" },
  { key: "/oss/", service: "/api/oss", dev: "http://192.168.100.114:8081" },
  {
    key: "/client/",
    service: "/api/client",
    dev: "http://192.168.100.114:8083"
  },
  {
    key: "/storage/",
    service: "/api/storage",
    dev: "http://192.168.100.114:8084"
  },
  {
    key: "/sysBackendCategoryAttr/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/brand/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/tenantUnit/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/tenantBackCate/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/tenantFrontCate/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/frontBackCate/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/mobile/tenantProduct/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/sysAccount/",
    service: "/api/system",
    dev: "http://192.168.100.114:8088"
  },
  {
    key: "/storesysBaseInfo/",
    service: "/api/system",
    dev: "http://192.168.100.114:8088"
  },
  {
    key: "/sysWechatappLiveroom/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/tenantMemberLevel/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/tenantProductUserLabel/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/sysWechatThirdAuthInfo/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/sysWechatThirdAuth/",
    service: "/api/system",
    dev: "http://192.168.100.114:8088"
  },
  {
    key: "/tenantSingleProduct/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  {
    key: "/tenantEmployeeAccount/",
    service: "/api/product",
    dev: "http://192.168.100.142:8080"
  },
  { key: "/order/", service: "/api/order", dev: "http://192.168.100.114:8086" },
  { key: "/sms/", service: "/api/product", dev: "http://192.168.100.142:8080" },
  { key: "/captcha/", service: "/api/sms", dev: "http://192.168.100.111:80" },
  {
    key: "/market/",
    service: "/api/market",
    dev: "http://192.168.100.38:8086"
  }
];

const genMap = ({ origin = "https://saas.xzintl.com", isDev = false } = {}) => {
  return ApiInfos.reduce((result, { key, service, dev }) => {
    result[key] = isDev ? [dev] : [origin + service];
    return result;
  }, {});
};

const CONFIG = {
  dev: {
    apiUrl: genMap({ isDev: true })
  },
  beta: {
    apiUrl: genMap({ origin: "https://saastest.xzintl.com" })
  },
  beta1: {
    apiUrl: genMap({ origin: "https://saastest.xzdev.com" })
  },
  prod: {
    apiUrl: genMap({ origin: "https://saas.xzintl.com" })
  }
};

const { VUE_APP_API_ENV } = process.env;

let config = CONFIG[VUE_APP_API_ENV];

if (!config) {
  throw new Error(`请检查环境配置，当前环境：[${VUE_APP_API_ENV}]`);
} else {
  console.log("VUE_APP_API_ENV=", VUE_APP_API_ENV);
}

export const getUrl = url => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  let domain = "";
  for (let key in config.apiUrl) {
    if (url.indexOf(key) === 0) {
      domain =
        config.apiUrl[key][
          Math.floor(Math.random() * config.apiUrl[key].length)
        ];
      break;
    }
  }
  return domain + url;
};
