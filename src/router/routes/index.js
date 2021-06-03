const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue")
  },
  {
    path: "/addComplaint",
    name: "AddComplaint",
    meta: {
      title: '我要投诉'
    },
    component: () => import("@/views/AddComplaint/index.vue")
  },
  {
    path: "/queryDetail",
    name: "QueryDetail",
    meta: {
      title: '查询详情'
    },
    component: () => import("@/views/QueryDetail/index.vue")
  },
  {
    path: "/rubbish",
    name: "Rubbish",
    meta: {
      title: '垃圾分类指南'
    },
    component: () => import("@/views/Rubbish/index.vue")
  },
  {
    path: "/rubbishComment",
    name: "RubbishComment",
    props: route => ({
      id: route.query.id
    }),
    component: () => import("@/views/RubbishComment/index.vue")
  },
  {
    path: "/search",
    name: "Search",
    props: route => ({
      keyword: route.query.keyword
    }),
    meta: {
      title: '搜索'
    },
    component: () => import("@/views/Search/index.vue")
  },

];

export default routes;
