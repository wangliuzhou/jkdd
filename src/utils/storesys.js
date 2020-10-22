import { getPageQuery } from "@/utils/index";

export const shopUrlRegExp = /^shop_([^.]+)\.m\.xzintl\.com$/;

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

export const storesysId = getStoresysIdFromUrl();
