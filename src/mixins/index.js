import router from "@/utils/router";

export default function(Vue) {
  Vue.mixin({
    methods: {
      $push(options) {
        router.push(options);
      }
    }
  });
}
