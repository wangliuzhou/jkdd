const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue")
  },
  {
    path: "/addComplaint",
    name: "AddComplaint",
    component: () => import("@/views/AddComplaint/index.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    props: route => ({
      bindPhone: Boolean(route.query.bindPhone)
    }),
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login/index.vue")
  }
];

export default routes;
