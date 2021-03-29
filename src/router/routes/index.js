const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {},
    props: route => ({
      bindPhone: Boolean(route.query.bindPhone)
    }),
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login/index.vue")
  }
];

export default routes;
