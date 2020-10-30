import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
// 懒加载
import VueLazyload from "vue-lazyload";
// 轮播图
import VueAwesomeSwiper from "vue-awesome-swiper";
// 粘贴板
import VueClipboard from "vue-clipboard2";

import FastClick from "fastclick";
// 移动端适配
import "lib-flexible/flexible.js";
// axios请求
import request from "@/config/request";
// 全局mixin
import mixins from "@/mixins/index";
// 全局组件
import Components from "@/components/index";
// vant组件
import {
  Toast,
  Switch,
  Loading,
  Dialog,
  NoticeBar,
  Tabbar,
  TabbarItem,
  Popup,
  Swipe,
  SwipeItem,
  Field,
  Area,
  List,
  Image as VanImage,
  Button
} from "vant";

// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";

// fundebug.init({
//   apikey: "11c1749d557dd3d3ab98a2c644ce800cf5c0a1bbf8ace35571558d97d9b0484f"
// });
// fundebugVue(fundebug, Vue);

//全局样式
import "normalize.css";
import "swiper/css/swiper.css";
import "@/assets/style/index.less";
import "@/assets/iconfont/iconfont.less";

//开发环境显示vconsole按钮
if (process.env.VUE_APP_API_ENV === "dev") {
  const Vconsole = require("vconsole");
  const vConsole = new Vconsole();
  Vue.use(vConsole);
}
// 注册自定义全局组件
Vue.use(Components);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
});
Vue.use(VueAwesomeSwiper);
Vue.use(mixins);
Vue.use(request);
// 复制到剪切板
Vue.use(VueClipboard);
//vant
Vue.use(Toast);
Vue.use(Switch);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(NoticeBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Field);
Vue.use(Area);
Vue.use(List);
Vue.use(VanImage);
Vue.use(Button);

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
