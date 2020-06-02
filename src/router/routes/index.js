const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "Index",
    meta: {
      needLogin: false
    },
    component: () => import(/* webpackChunkName: "Index" */ "@/views/Index.vue")
  },
  {
    path: "/loginError",
    name: "LoginError",
    component: () =>
      import(/* webpackChunkName: "LoginError" */ "@/views/LoginError.vue")
  }
];

export default routes;
