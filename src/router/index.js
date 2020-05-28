import Vue from "vue";
import VueRouter from "vue-router";
import { wechatShareSaveCurpage, shakePage } from "@/utils/bugfix";
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
  //处理微信分享bug
  wechatShareSaveCurpage(to, from, next);
  //判断是否需要登录
  if (needLogin(to)) {
    login();
    next(false);
  } else {
    next();
  }
});

router.afterEach((to /*, from, next*/) => {
  shakePage();
  if (to && to.meta && to.meta.title !== undefined) {
    document.title = to.meta.title;
  }
});

export default router;
