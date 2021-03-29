import Vue from "vue";
import VueRouter from "vue-router";
import { needLogin, login } from "@/utils/account";
import routes from "./routes/index";
import { cancelAllRequest } from "@/config/request";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach(function(to, from, next) {
  //取消所有网络请求
  cancelAllRequest();
  //判断是否需要登录
  if (needLogin(to)) {
    login();
    next(false);
  } else {
    next();
  }
});

router.afterEach((to /*, from, next*/) => {
  // 抖动一下，防止页面空白的bug
  window.scrollBy(0, -1);
  window.scrollBy(0, 1);
  if (to && to.meta && to.meta.title !== undefined) {
    document.title = to.meta.title;
  }
});

export default router;
