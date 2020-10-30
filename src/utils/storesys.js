import { getPageQuery } from "@/utils/index";
import { shopOriginRegExp } from "@/utils/regexp";

const sotresys = {};

Object.defineProperty(sotresys, "storesysId", {
  get() {
    return getStoresysIdFromUrl();
  }
});

export default sotresys;

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
