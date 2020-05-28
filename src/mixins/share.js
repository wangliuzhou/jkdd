import { Toast } from "vant";
import shareImg from "@/assets/logo.png";
import { isWechat, isIphone } from "@/utils/index";
import cfg from "@/config/index";

//授权jssdk api列表
const defaultJsApiList = [
  "checkJsApi",
  "chooseWXPay",
  "onMenuShareTimeline",
  "onMenuShareAppMessage",
  "onMenuShareQQ",
  "onMenuShareWeibo",
  "onMenuShareQZone",
  "hideMenuItems",
  "showMenuItems",
  "chooseImage",
  "previewImage",
  "uploadImage",
  "downloadImage"
];

//默认分享参数
const defaultShareParams = {
  title: "【关注】今天，最符合你心中期待的小程序商城，他来了！", // 分享标题
  desc: "象征智慧零售-硬核的私域营销专家，助您成就辉煌！", // 分享描述
  link: location.origin, // 分享地址
  imgUrl: location.origin + shareImg // 分享图标
};

const hideAllMenuItems = () => {
  wx.ready(() => {
    hideMenuItems([
      "menuItem:exposeArticle",
      "menuItem:setFont",
      "menuItem:dayMode",
      "menuItem:nightMode",
      "menuItem:refresh",
      "menuItem:profile",
      "menuItem:addContact",
      "menuItem:share:appMessage",
      "menuItem:share:timeline",
      "menuItem:share:qq",
      "menuItem:share:weiboApp",
      "menuItem:favorite",
      "menuItem:share:facebook",
      "menuItem:share:QZone",
      "menuItem:editTag",
      "menuItem:delete",
      "menuItem:copyUrl",
      "menuItem:originPage",
      "menuItem:readMode",
      "menuItem:openWithQQBrowser",
      "menuItem:openWithSafari",
      "menuItem:share:email",
      "menuItem:share:brand"
    ]);
  });
};

const showMenuItems = menuList => {
  wx.showMenuItems({
    menuList, // 要显示的菜单项，所有menu项见附录3
    success: () => {},
    fail: function(res) {
      console.error(res);
    }
  });
};

const hideMenuItems = menuList => {
  wx.hideMenuItems({
    menuList,
    success: () => {},
    fail: function(res) {
      console.error(res);
    }
  });
};

export default {
  methods: {
    setWxShare(opt) {
      if (!isWechat) {
        return console.log("不是微信浏览器");
      }

      opt = opt ? opt : {};

      if (typeof opt === "function") {
        opt = { callback: opt };
      }

      let {
          errCallback = () => {},
          jsApiList,
          hideShareMenu,
          signCallback,
          shareParams = {}
        } = opt,
        signUrl =
          (isIphone && localStorage.getItem("wechatCurPage")) || location.href;

      jsApiList = jsApiList || defaultJsApiList;
      shareParams = Object.assign({}, defaultShareParams, shareParams);

      this.$post(
        "/ThirdPartyDocking/Wechat/Agent/WechatOffcialAccount/JsTicket",
        {
          data: {
            authAppID: cfg.appId,
            url: signUrl
          }
        }
      ).then(
        ({
          code,
          data: {
            appID,
            timestamp,
            nonceStr,
            signature,
            shareAppMessageSuccess = () => {},
            shareTimelineSuccess = () => {}
          }
        }) => {
          if (code === 200) {
            //配置参数
            wx.config({
              debug: false,
              appId: appID,
              timestamp,
              nonceStr,
              signature,
              jsApiList
            });
            //设置成功回调
            wx.error(res => {
              console.error(res);
              errCallback(res);
            });

            if (hideShareMenu) {
              //隐藏分享
              hideAllMenuItems();
            } else if (signCallback) {
              //签名成功之后通过回调函数形式进行显示隐藏微信菜单
              wx.ready(() => {
                signCallback();
              });
            } else {
              wx.ready(function() {
                // 分享到qq和qq朋友圈菜单隐藏
                let hideMenuList = [
                    "menuItem:share:qq", // 分享到QQ
                    "menuItem:share:QZone" // 分享到QQ
                  ],
                  showMenuList = [
                    "menuItem:share:appMessage",
                    "menuItem:favorite",
                    "menuItem:openWithQQBrowser",
                    "menuItem:copyUrl"
                  ];

                let { title, desc, link, imgUrl } = shareParams;

                ["onMenuShareAppMessage", "onMenuShareTimeline"].forEach(
                  item => {
                    wx[item]({
                      title,
                      desc,
                      link,
                      imgUrl,
                      type: "", // 分享类型,music、video或link，不填默认为link
                      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                      success: () => {
                        Toast({ position: "bottom", message: "分享成功了!" });
                        //分享成功回调
                        if (item === "onMenuShareAppMessage") {
                          shareAppMessageSuccess();
                        } else if (item === "onMenuShareTimeline") {
                          shareTimelineSuccess();
                        }
                      },
                      cancel: () => {}
                    });
                  }
                );

                //隐藏指定菜单
                hideMenuItems(hideMenuList);

                //显示指定菜单
                showMenuItems(showMenuList);
              });
            }
          } else {
            Toast({ position: "bottom", message: "分享参数配置失败" });
          }
        }
      );
    }
  }
};
