import { getPageQuery } from "@/utils/index";

export const shopUrlRegExp = /^shop_([^.]+)\.m\.xzintl\.com$/;

// 从url中获取storesysId
const getStoresysIdFromUrl = () => {
  let shopRes = location.host.match(shopUrlRegExp);
  let { storesysId } = getPageQuery();

  if (shopRes && shopRes[1]) {
    return shopRes[1].toUpperCase();
  } else if (storesysId) {
    return storesysId.toUpperCase();
  }

  return null;
};

const sotresys = {};

Object.defineProperty(sotresys, "storesysId", {
  get() {
    return getStoresysIdFromUrl();
  }
});

export default sotresys;
