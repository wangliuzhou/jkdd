import Cookie from "js-cookie";
import storesys from "@/utils/storesys";

export const CookieSet = (key, value) => {
  Cookie.set(key, value, {
    domain: ".xzintl.com"
  });
};

export const CookieGet = key => {
  return Cookie.get(key);
};

export const StoresysCookieSet = (key, value) => {
  Cookie.set(`${key}_${storesys.storesysId}`, value, {
    domain: ".xzintl.com"
  });
};

export const StoresysCookieGet = key => {
  return Cookie.get(`${key}_${storesys.storesysId}`);
};
