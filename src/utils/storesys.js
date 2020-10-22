import { getPageQuery } from "@/utils/index";

const getStoresysIdFromUrl = () => {
  let shopRes = location.host.match(/^shop_([^.]+)\.m\.xzintl\.com$/);
  let { storesysId } = getPageQuery();

  if (shopRes && shopRes[1]) {
    return shopRes[1].toUpperCase();
  } else if (storesysId) {
    return storesysId.toUpperCase();
  }

  return null;
};

export const storesysId = getStoresysIdFromUrl();
