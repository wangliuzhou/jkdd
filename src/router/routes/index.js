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
    path: "/seckill/:id",
    name: "Seckill",
    props: route => ({
      id: route.params.id
    }),
    meta: {
      needLogin: false
    },
    component: () => import("@/views/Seckill/index.vue")
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
    path: "/goodsGroup",
    name: "GoodsGroup",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/GoodsGroup/index.vue")
  },
  {
    path: "/orderLogistics",
    name: "OrderLogistics",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/OrderLogistics/index.vue")
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
  },
  {
    path: "/userCenter",
    name: "UserCenter",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/UserCenter/index.vue")
  },
  {
    path: "/qrcodeIntroduction",
    name: "QrcodeIntroduction",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/QrcodeIntroduction/index.vue")
  },
  {
    path: "/qrcodeMissing",
    name: "QrcodeMissing",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/QrcodeMissing/index.vue")
  },
  {
    path: "/qrcodeDetail",
    name: "QrcodeDetail",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/QrcodeDetail/index.vue")
  },
  {
    path: "/officialAccountQrcode",
    name: "OfficialAccountQrcode",
    props: route => ({
      gzhName: route.query.gzhName,
      gzhQrcode: route.query.gzhQrcode
    }),
    meta: {
      needLogin: false
    },
    component: () => import("@/views/OfficialAccountQrcode/index.vue")
  },
  {
    path: "/coupons",
    name: "Coupons",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/Coupons/index.vue")
  },
  {
    path: "/couponsInvalid",
    name: "CouponsInvalid",
    meta: {
      needLogin: false
    },
    component: () => import("@/views/CouponsInvalid/index.vue")
  }
];

export default routes;
