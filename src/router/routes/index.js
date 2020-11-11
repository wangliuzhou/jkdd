const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue")
  },
  {
    path: "/classify",
    name: "Classify",
    component: () => import("@/views/Classify/index.vue")
  },
  {
    path: "/microPage/:id",
    name: "MicroPage",
    props: route => ({
      id: Number(route.params.id)
    }),
    component: () => import("@/views/MicroPage.vue")
  },
  {
    path: "/goodsDetail/:id",
    name: "GoodsDetail",
    props: route => ({
      id: route.params.id
    }),
    component: () => import("@/views/GoodsDetail/index.vue")
  },
  {
    path: "/seckill/:id/:seckillOutId",
    name: "Seckill",
    props: route => ({
      id: route.params.id,
      seckillOutId: route.params.seckillOutId
    }),
    component: () => import("@/views/Seckill/index.vue")
  },
  {
    path: "/orderList",
    name: "OrderList",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/OrderList/index.vue")
  },
  {
    path: "/orderDetail",
    name: "OrderDetail",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/OrderDetail/index.vue")
  },
  {
    path: "/addressList",
    name: "AddressList",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/AddressList/index.vue")
  },
  {
    path: "/addAddress",
    name: "AddAddress",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/AddAddress/index.vue")
  },
  {
    path: "/goodsGroup",
    name: "GoodsGroup",
    component: () => import("@/views/GoodsGroup/index.vue")
  },
  {
    path: "/orderLogistics",
    name: "OrderLogistics",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/OrderLogistics/index.vue")
  },
  {
    path: "/pay/orderSettle",
    name: "OrderSettle",
    props: route => ({
      skuIds: route.query.skuIds,
      skuNums: route.query.skuNums,
      addressId: Number(route.query.addressId),
      couponId: route.query.couponId,
      seckillActivityId: route.query.seckillActivityId,
      fromCart: Boolean(route.query.fromCart)
    }),
    meta: {
      needLogin: true
    },
    component: () => import("@/views/OrderSettle/index.vue")
  },
  {
    path: "/payResult",
    name: "payResult",
    props: route => ({
      price: Number(route.query.price)
    }),
    meta: {
      needLogin: true
    },
    component: () => import("@/views/PayResult/index.vue")
  },
  {
    path: "/test",
    name: "Test",
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
      needLogin: true
    },
    component: () => import("@/views/UserCenter/index.vue")
  },
  {
    path: "/membersCenter",
    name: "MembersCenter",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/MembersCenter/index.vue")
  },
  {
    path: "/joinMember",
    name: "JoinMember",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/JoinMember/index.vue")
  },
  {
    path: "/qrcodeIntroduction",
    name: "QrcodeIntroduction",
    component: () => import("@/views/QrcodeIntroduction/index.vue")
  },
  {
    path: "/qrcodeMissing",
    name: "QrcodeMissing",
    component: () => import("@/views/QrcodeMissing/index.vue")
  },
  {
    path: "/qrcodeDetail",
    name: "QrcodeDetail",
    component: () => import("@/views/QrcodeDetail/index.vue")
  },
  {
    path: "/officialAccountQrcode",
    name: "OfficialAccountQrcode",
    props: route => ({
      gzhName: route.query.gzhName,
      gzhQrcode: route.query.gzhQrcode
    }),
    component: () => import("@/views/OfficialAccountQrcode/index.vue")
  },
  {
    path: "/coupons",
    name: "Coupons",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/Coupons/index.vue")
  },
  {
    path: "/couponsInvalid",
    name: "CouponsInvalid",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/CouponsInvalid/index.vue")
  },
  {
    path: "/passport/login",
    name: "Login",
    props: route => ({
      storesysId: route.query.storesysId,
      redirectUrl: decodeURIComponent(route.query.redirectUrl)
    }),
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: "/shoppingCart",
    name: "ShoppingCart",
    meta: {
      needLogin: true
    },
    component: () => import("@/views/ShoppingCart/index.vue")
  }
];

export default routes;
