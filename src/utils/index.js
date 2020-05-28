//判断是否为微信环境
export const isWechat = /micromessenger/.test(
  navigator.userAgent.toLowerCase()
);
//是否为iPhone
export const isIphone =
  navigator.userAgent.indexOf("iPhone") > -1 ||
  navigator.userAgent.indexOf("Mac") > -1 ||
  navigator.userAgent.indexOf("iPad") > -1;
//是否为Android移动设备
export const isAndroid =
  navigator.userAgent.indexOf("Android") > -1 ||
  navigator.userAgent.indexOf("Linux") > -1;
//是否移动端
export const isMobile = !!/mobile/i.test(navigator.userAgent);
//是否为QQ浏览器
export const isQQBrowser = navigator.userAgent.indexOf("MQQBrowser") > -1;
//是否是safari浏览器
export const isSafari = navigator.userAgent.indexOf("Safari") > -1;

// base64转blob
export const dataURItoBlob = dataurl => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
