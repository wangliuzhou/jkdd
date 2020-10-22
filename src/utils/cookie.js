import Cookie from "js-cookie";
import { storesysId } from "@/utils/storesys";

export const CookieSet = (key, value) => {
  Cookie.set(key, value, {
    domain: ".xzintl.com"
  });
};

export const StoresysCookieSet = (key, value) => {
  Cookie.set(`${key}_${storesysId}`, value, {
    domain: ".xzintl.com"
  });
};

export const StoresysCookieGet = key => {
  return Cookie.get(`${key}_${storesysId}`);
};
