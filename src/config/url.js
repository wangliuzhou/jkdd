const { VUE_APP_API_ENV } = process.env;
const CONFIG = {
  dev: {
    url_map: {
      "/store/": ["http://192.168.100.114:8080"],
      "/oss/": ["http://192.168.100.114:8081"],
      "/shop/": ["http://192.168.100.114:8080"],
      "/sysBackendCategoryAttr/": ["http://192.168.100.142:8080"],
      "/brand/": ["http://192.168.1.8:8080"],
      "/tenantUnit/": ["http://192.168.100.142:8080"],
      "/tenantBackCate/": ["http://192.168.1.8:8080"],
      "/frontBackCate/": ["http://192.168.1.8:8080"],
      "/tenantFrontCate/": ["http://192.168.1.8:8080"],
      "/tenantProduct/": ["http://192.168.1.8:8080"],
      "/sysAccount/": ["http://192.168.100.142:8088"],
      "/storesysBaseInfo/": ["http://192.168.1.8:8088"],
      "/client/": ["http://192.168.100.114:8083"],
      "/sysWechatappLiveroom/": ["http://192.168.100.142:8080"],
      "/tenantMemberLevel/": ["http://192.168.100.142:8080"],
      "/tenantProductUserLabel": ["http://192.168.100.142:8080"],
      "/sysWechatThirdAuth": ["http://192.168.100.142:8088"]
    }
  },
  beta: {},
  pro: {}
};
let config = "";
if (["beta", "pro"].indexOf(VUE_APP_API_ENV) > -1) {
  config = CONFIG[VUE_APP_API_ENV];
} else {
  config = CONFIG["dev"];
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
