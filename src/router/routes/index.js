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
    path: "/orderList",
    name: "OrderList",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/OrderList/index.vue")
  },
  {
    path: "/orderDetail",
    name: "OrderDetail",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/OrderDetail/index.vue")
  },
  {
    path: "/addressList",
    name: "AddressList",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/AddressList/index.vue")
  },
  {
    path: "/addAddress",
    name: "AddAddress",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/AddAddress/index.vue")
  },
  {
    path: "/orderSettle",
    name: "OrderSettle",
    props: route => ({
      skuIds: route.query.skuIds,
      skuNums: route.query.skuNums,
      addressId: route.query.addressId
    }),
    meta: {
      needLogin: false
    },
    component: () => import("@/views/OrderSettle/index.vue")
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
