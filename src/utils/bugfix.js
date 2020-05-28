import { isIphone } from "@/utils/index";

export const wechatShareSaveCurpage = (to, from /*, next*/) => {
  if (isIphone) {
    if (from.name == null && from.path == "/") {
      localStorage.setItem("wechatCurPage", location.origin + to.fullPath);
    }
  }
};

//抖动页面防止空白
export const shakePage = () => {
  // vm.$nextTick(() => {
  // 抖动一下，防止页面空白的bug
  window.scrollBy(0, -1);
  window.scrollBy(0, 1);
  // });
};
