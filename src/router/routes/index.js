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
    component: () => import("@/views/Classify/index.vue")
  },
  {
    path: "/microPage/:id",
    name: "MicroPage",
    props: route => ({
      id: route.params.id
    }),
    meta: {
      needLogin: false
    },
    component: () => import("@/views/MicroPage.vue")
  },
  {
    path: "/goodsDetail/:id",
    name: "GoodsDetail",
    props: route => ({
      id: route.params.id
    }),
    meta: {
      needLogin: false
    },
    component: () => import("@/views/GoodsDetail/index.vue")
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
