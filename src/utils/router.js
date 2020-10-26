import router from "@/router/index";
import { shopUrlRegExp, storesysId } from "@/utils/storesys";
import { joinPath } from "@/utils/index";
import Cfg from "@/config/index";

const hrefOrReplace = ({ path, replace = false }) => {
  if (replace) {
    window.location.replace(path);
  } else {
    window.location.href = path;
  }
};

const pushOrReplace = ({ location, onComplete, onAbort, replace = false }) => {
  // 当前是否在shop开头的域名下
  let curIsShopOrigin = shopUrlRegExp.test(window.location.host);
  let curIsCashierOrigin = /^cashier\.xzintl\.com$/.test(window.location.host);
  // 拼装要跳转的url
  let path = "";
  if (typeof location === "string") {
    path = location;
  } else {
    path = location.path;
    if (location.query) {
      path = joinPath(path, location.query);
    }
  }

  if (curIsShopOrigin && path.indexOf("/pay/") === 0) {
    return hrefOrReplace({ path: Cfg.cashierOrigin + path, replace });
  }
  if (curIsCashierOrigin && path.indexOf("/pay/") !== 0) {
    return hrefOrReplace({
      path:
        Cfg.shopOrigin.replace("${storesysId}", storesysId.toLowerCase()) +
        path,
      replace
    });
  }
  return router[replace ? "replace" : "push"](location, onComplete, onAbort);
};

export default {
  push: (location, onComplete, onAbort) => {
    pushOrReplace({
      location,
      onComplete,
      onAbort
    });
  },
  replace: (location, onComplete, onAbort) => {
    pushOrReplace({
      location,
      onComplete,
      onAbort,
      replace: true
    });
  }
};
