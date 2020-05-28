const routes = [
  {
    path: "/introduce",
    name: "Introduce",
    meta: {
      needLogin: true
    },
    component: () =>
      import(/* webpackChunkName: "Introduce" */ "@/views/Introduce.vue")
  },
  {
    path: "/businessCard",
    name: "BusinessCard",
    meta: {
      needLogin: true
    },
    component: () =>
      import(/* webpackChunkName: "BusinessCard" */ "@/views/BusinessCard.vue")
  },
  {
    path: "/loginError",
    name: "LoginError",
    component: () =>
      import(/* webpackChunkName: "LoginError" */ "@/views/LoginError.vue")
  }
];

export default routes;
