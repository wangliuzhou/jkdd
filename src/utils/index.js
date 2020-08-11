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

export const px2rem = val => {
  return `${val / 37.5}rem`;
};

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export const formatTime = date => {
  typeof date === "number" ? (date = new Date(date)) : null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const formatTimeSimple = date => {
  typeof date === "number" ? (date = new Date(date)) : null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join(".");
};

export const getUUID = () => {
  let d = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
