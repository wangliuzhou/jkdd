import { getPageQuery } from "@/utils/index";
import { shopOriginRegExp } from "@/utils/regexp";
import Cfg from "@/config/index";

// 从url中获取storesysId
const getStoresysIdFromUrl = () => {
  let shopRes = location.origin.match(shopOriginRegExp);
  if (shopRes && shopRes[1]) {
    return shopRes[1].toUpperCase();
  }

  let { storesysId } = getPageQuery();
  if (storesysId) {
    return storesysId.toUpperCase();
  }

  return null;
};

//获取h5域名
// eslint-disable-next-line
export const getShopOrigin = () => {
  let testfillStr = /test/.test(window.location.origin) ? "test" : "";
  return Cfg.shopOrigin
    .replace("${storesysId}", storesys.storesysId.toLowerCase())
    .replace("${test}", testfillStr);
};

const storesys = {};

Object.defineProperty(storesys, "storesysId", {
  get() {
    return getStoresysIdFromUrl();
  }
});

Object.defineProperty(storesys, "shopOrigin", {
  get() {
    return getShopOrigin();
  }
});

export default storesys;
