export const ali = (url, w) => {
  if (!url || /^\s+$/.test(url)) {
    return "";
  }
  // 如果图片链接中已经包含了过滤参数，则直接跳过
  if (/x-oss-process=/.test(url)) {
    return url;
  }

  let dpr = parseInt(
    window.document.documentElement.getAttribute("data-dpr"),
    10
  );

  // dpr不能小于2，否则图片会太模糊
  dpr = Math.max(dpr, 1);

  w = w || 750;

  if (url.indexOf("?") > -1) {
    url += "&";
  } else {
    url += "?";
  }

  //gif
  if (/\.gif/i.test(url)) {
    url += "x-oss-process=image/resize,w_" + parseInt(w * dpr);
  } else if (/\.png/i.test(url)) {
    url +=
      "x-oss-process=image/format,png/interlace,1,image/resize,w_" +
      parseInt(w * dpr);
  } else {
    url +=
      "x-oss-process=image/format,jpg/interlace,1,image/resize,w_" +
      parseInt(w * dpr);
  }
  // 新增sharpen锐化参数，减少图片缩放后的模糊效果
  url += "/quality,Q_60/sharpen,90";

  return url;
};
