import router from "@/utils/router";

export default function(Vue) {
  Vue.mixin({
    methods: {
      $push(location, onComplete, onAbort) {
        return router.push(location, onComplete, onAbort);
      },
      $replace(location, onComplete, onAbort) {
        return router.replace(location, onComplete, onAbort);
      }
    }
  });
}
