import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
// 懒加载
import VueLazyload from "vue-lazyload";
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
  Form,
  Uploader,
  RadioGroup,
  Radio,
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
  Image,
  Button,
  SwipeCell,
  Cell,
  Checkbox,
  Tab,
  Tabs,
  Overlay
} from "vant";

//全局样式
import "normalize.css";
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
Vue.use(mixins);
Vue.use(request);
// 复制到剪切板
Vue.use(VueClipboard);
//vant
Vue.use(Form);
Vue.use(Uploader);
Vue.use(RadioGroup);
Vue.use(Radio);
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
Vue.use(Image);
Vue.use(Button);
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(Checkbox);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Overlay);

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
