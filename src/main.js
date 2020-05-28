import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";

// import FastClick from "fastclick";
import "lib-flexible/flexible.js";

//axios
import request from "@/config/request";

import { Toast, Switch, Loading, Dialog } from "vant";

import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";

fundebug.init({
  apikey: "11c1749d557dd3d3ab98a2c644ce800cf5c0a1bbf8ace35571558d97d9b0484f"
});
fundebugVue(fundebug, Vue);

//全局样式
import "normalize.css";
import "swiper/css/swiper.css";
import "@/assets/style/index.less";

//开发环境显示vconsole按钮
if (process.env.VUE_APP_API_ENV === "dev") {
  const Vconsole = require("vconsole");
  const vConsole = new Vconsole();
  Vue.use(vConsole);
}

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
});
Vue.use(VueAwesomeSwiper);
Vue.use(request);
Vue.use(Toast);
Vue.use(Switch);
Vue.use(Loading);
Vue.use(Dialog);

// FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
