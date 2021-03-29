const { VUE_APP_API_ENV } = process.env;
console.log("VUE_APP_API_ENV=", VUE_APP_API_ENV);

// 有dev和prod两个环境
const domainObj = {
  dev: "https://dev-api",
  prod: "https://prod-api"
};

export const getUrl = url => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  return domainObj[VUE_APP_API_ENV] + url;
};
