const { VUE_APP_API_ENV } = process.env;
const CONFIG = {
  dev: {
    url_map: {
      "/ThirdPartyDocking/Wechat/": ["http://third.xzintl.com"],
      "/oss/": ["http://oss.xzintl.com"],
      // "/salesmanInfo/": ["http://192.168.1.8:8081"]
      "/salesmanInfo/": ["http://agent.xzintl.com/api"]
      // "/salesmanInfo/": ["http://oss.xzintl.com"]
    }
  },
  beta: {
    url_map: {
      "/ThirdPartyDocking/Wechat/": ["http://third.xzintl.com"],
      "/oss/": ["http://oss.xzintl.com"],
      "/salesmanInfo/": ["http://agent.xzintl.com/api"]
    }
  },
  pro: {
    url_map: {
      "/ThirdPartyDocking/Wechat/": ["http://third.xzintl.com"],
      "/oss/": ["http://oss.xzintl.com"],
      "/salesmanInfo/": ["http://agent.xzintl.com/api"]
    }
  }
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
