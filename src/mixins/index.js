import router from "@/router";

export default function(Vue) {
  Vue.mixin({
    methods: {
      $push(params) {
        return router.push(params);
      }
    }
  });
}
