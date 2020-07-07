const routes = [
  {
    path: "/",
    name: "Index",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/Index.vue")
  },
  {
    path: "/classify",
    name: "Classify",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/Classify.vue")
  },
  {
    path: "/test",
    name: "Test",
    meta: {
      needLogin: false
    },
    component: () => import(/* webpackChunkName: "Test" */ "@/views/Test.vue")
  },
  {
    path: "/loginError",
    name: "LoginError",
    component: () =>
      import(/* webpackChunkName: "LoginError" */ "@/views/LoginError.vue")
  }
];

export default routes;
