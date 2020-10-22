import router from "@/router/index";
import { shopUrlRegExp, storesysId } from "@/utils/storesys";

export default {
  push: (location, onComplete, onAbort) => {
    let curIsShopUrl = shopUrlRegExp.test(window.location.host);
    let goPath = typeof location === "string" ? location : location.path;

    if (curIsShopUrl && goPath.indexOf("/pay/") === 0) {
      window.location.href = `http://cashier.xzintl.com${goPath}`;
    } else if (!curIsShopUrl && goPath.indexOf("/pay/") !== 0) {
      window.location.href = `http://shop_${storesysId.toLowerCase()}.m.xzintl.com${goPath}`;
    } else {
      return router.push(location, onComplete, onAbort);
    }
  },
  replace: (location, onComplete, onAbort) => {
    let curIsShopUrl = shopUrlRegExp.test(window.location.host);
    let goPath = typeof location === "string" ? location : location.path;

    if (curIsShopUrl && goPath.indexOf("/pay/") === 0) {
      window.location.replace(`http://cashier.xzintl.com${goPath}`);
    } else if (!curIsShopUrl && goPath.indexOf("/pay/") !== 0) {
      window.location.replace(
        `http://shop_${storesysId.toLowerCase()}.m.xzintl.com${goPath}`
      );
    } else {
      return router.replace(location, onComplete, onAbort);
    }
  }
};
