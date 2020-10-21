export const storesysId = (function fn() {
  let res = location.host.match(/^shop_([^.]+)\.m\.xzintl\.com$/);
  if (res && res[1]) {
    return res[1].toUpperCase();
  }
  return "";
})();
