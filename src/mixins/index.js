import router from "@/utils/router";
import { ali } from "@/utils/image";

export default function(Vue) {
  Vue.mixin({
    methods: {
      $ali: ali,
      $push(location, onComplete, onAbort) {
        return router.push(location, onComplete, onAbort);
      },
      $replace(location, onComplete, onAbort) {
        return router.replace(location, onComplete, onAbort);
      }
    }
  });
}
