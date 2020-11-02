import router from "@/router/index";
import storesys from "@/utils/storesys";
import {
  shopOriginRegExp,
  cashierOriginRegExp,
  passportOriginRegExp
} from "@/utils/regexp";
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
  let testfillStr = /test/.test(window.location.origin) ? "test" : "";
  // 当前是否在shop开头的域名下
  let curIsShopOrigin = shopOriginRegExp.test(window.location.origin);
  let curIsCashierOrigin = cashierOriginRegExp.test(window.location.origin);
  let curIsPassportOrigin = passportOriginRegExp.test(window.location.origin);
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

  if (/^https?:\/\//.test(path)) {
    return hrefOrReplace({ path, replace });
  }

  let specialOrigin = [
    {
      originTest: curIsCashierOrigin,
      origin: Cfg.cashierOrigin,
      pathPre: "/pay/"
    },
    {
      originTest: curIsPassportOrigin,
      origin: Cfg.passportOrigin,
      pathPre: "/login"
    }
  ];
  for (let i = 0; i < specialOrigin.length; i++) {
    let item = specialOrigin[i];
    // 从shop域名跳转到其他域名
    if (curIsShopOrigin && path.indexOf(item.pathPre) === 0) {
      return hrefOrReplace({
        path: item.origin.replace("${test}", testfillStr) + path,
        replace
      });
    }
  }

  for (let i = 0; i < specialOrigin.length; i++) {
    let item = specialOrigin[i];
    // 从其他域名跳转到shop域名
    if (item.originTest && path.indexOf(item.pathPre) !== 0) {
      return hrefOrReplace({
        path:
          Cfg.shopOrigin
            .replace("${storesysId}", storesys.storesysId.toLowerCase())
            .replace("${test}", testfillStr) + path,
        replace
      });
    }
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
