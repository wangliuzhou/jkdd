<template>
  <div v-if="dataIsLoad" class="index">
    <div class="index-content">
      <div class="title">
        【关注】今天，最符合你心中期待的小程 序商城，他来了！
      </div>
      <div class="share-user-card">
        <div
          class="left"
          :style="
            salesmanInfo.avatar
              ? {
                  'background-image': `url(${ali(salesmanInfo.avatar, 120)})`
                }
              : {}
          "
        ></div>
        <div class="center">
          <div v-if="salesmanInfo.salesmanName" class="username">
            {{ salesmanInfo.salesmanName }}
          </div>
          <div v-if="salesmanInfo.phone" class="phone">
            {{ salesmanInfo.phone }}
          </div>
        </div>
        <div class="right">
          <button @click="handleContactHe">联系TA</button>
        </div>
      </div>
      <div class="introduce-detail">
        <img
          class="introduce-detail-1"
          :src="require('@/assets/introduce/1.png')"
        />
        <img
          class="introduce-detail-2"
          :src="require('@/assets/introduce/2.png')"
        />
        <img
          class="introduce-detail-3"
          :src="require('@/assets/introduce/3.png')"
        />
        <img
          class="introduce-detail-4"
          :src="require('@/assets/introduce/4.png')"
        />
        <img
          ref="introduce-detail-5"
          class="introduce-detail-5"
          :src="require('@/assets/introduce/5.png')"
        />
      </div>
      <div class="share-user-info">
        <div
          class="face"
          :style="
            salesmanInfo.avatar
              ? {
                  'background-image': `url(${ali(salesmanInfo.avatar, 120)})`
                }
              : {}
          "
        ></div>
        <div v-if="salesmanInfo.salesmanName" class="username">
          {{ salesmanInfo.salesmanName }}
        </div>
        <div v-if="salesmanInfo.company" class="company">
          {{ salesmanInfo.company }}
        </div>
        <div v-if="salesmanInfo.position" class="post">
          {{ salesmanInfo.position }}
        </div>
        <div class="btn-group">
          <template v-if="salesmanInfo.phone">
            <button>
              <a :href="`tel:${salesmanInfo.phone}`"
                ><img class="call" src="../assets/call.png" />打电话</a
              >
            </button>
          </template>
          <template v-else>
            <button v-if="!isSelf" @click="handleNoPhone">
              <img class="call" src="../assets/call.png" />打电话
            </button>
            <button v-else class="noContent" @click="handleGoBusinessCard">
              + 添加电话
            </button>
          </template>

          <template v-if="salesmanInfo.qr">
            <button @click="handleAddWechat">
              <img class="wechat" src="../assets/wechat.png" />加微信
            </button>
          </template>
          <template v-else>
            <button v-if="!isSelf" @click="handleNoQr">
              <img class="wechat" src="../assets/wechat.png" />加微信
            </button>
            <button v-else class="noContent" @click="handleGoBusinessCard">
              + 添加微信
            </button>
          </template>
        </div>
        <div v-if="isSelf" class="edit-card-btn" @click="handleGoBusinessCard">
          修改名片
        </div>
      </div>

      <div
        v-if="
          salesmanInfo.isDisplayPoster == 1 && posterList && posterList.length
        "
        class="share-user-info-imgs"
      >
        <Swiper
          ref="swiper"
          :options="swiperOption"
          @slideChange="handleSlideChange"
        >
          <SwiperSlide v-for="(item, i) in posterList" :key="i">
            <img :src="ali(item.posterUrl)" />
          </SwiperSlide>
          <div
            class="c-swiper-pagination"
            slot="pagination"
            v-if="posterList.length > 1"
          >
            {{ swiperActiveIndex + 1 }} / {{ posterList.length }}
          </div>
          <!-- 左右箭头 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </Swiper>
      </div>

      <div
        v-if="
          salesmanInfo.email ||
            salesmanInfo.qqNumber ||
            salesmanInfo.fixedPhone ||
            salesmanInfo.address ||
            salesmanInfo.site ||
            salesmanInfo.intro
        "
        class="share-user-info-detail"
      >
        <div class="share-user-info-detail-content">
          <div v-if="salesmanInfo.email" class="share-user-info-detail-item">
            <div class="left">
              <img class="yx" src="../assets/yx.png" />
            </div>
            <div class="right">{{ salesmanInfo.email }}</div>
          </div>
          <div v-if="salesmanInfo.qqNumber" class="share-user-info-detail-item">
            <div class="left">
              <img class="yx" src="../assets/qq.png" />
            </div>
            <div class="right">{{ salesmanInfo.qqNumber }}</div>
          </div>
          <div
            v-if="salesmanInfo.fixedPhone"
            class="share-user-info-detail-item"
          >
            <div class="left">
              <img class="yx" src="../assets/fixedPhone.png" />
            </div>
            <div class="right">{{ salesmanInfo.fixedPhone }}</div>
          </div>
          <div v-if="salesmanInfo.address" class="share-user-info-detail-item">
            <div class="left">
              <img class="dz" src="../assets/dz.png" />
            </div>
            <div class="right">{{ salesmanInfo.address }}</div>
          </div>
          <div v-if="salesmanInfo.site" class="share-user-info-detail-item">
            <div class="left">
              <img class="wz" src="../assets/wz.png" />
            </div>
            <div class="right">{{ salesmanInfo.site }}</div>
          </div>
          <div
            v-if="salesmanInfo.intro"
            class="share-user-info-detail-item share-user-info-detail-item-grjj"
          >
            <!-- <div class="left">
              <img class="grjj" src="../assets/grjj.png" />
            </div> -->
            <div class="right">
              {{ salesmanInfo.intro }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="logo-wrap">
      <img src="../assets/index-logo.png" />
    </div>

    <div class="bottom-btn">
      <div class="bottom-btn-fixed">
        <button @click="showQrcode = true">点击生成我的推广名片</button>
      </div>
    </div>

    <van-dialog
      class="gzh-qrcode-dialog"
      v-model="showQrcode"
      close-on-click-overlay
      :show-confirm-button="false"
    >
      <div class="dialog-title">
        关注公众号不迷路
      </div>
      <img class="gzh-qrcode" src="../assets/gzh_qrcode.jpg" />
      <div class="dialog-bottom">
        进入公众号，点击菜单产品介绍-我的推广名片获取
      </div>
    </van-dialog>

    <van-dialog
      class="wechat-qrcode-dialog"
      v-model="showWechatQrcode"
      close-on-click-overlay
      :show-confirm-button="false"
    >
      <img class="wechat-qrcode" :src="salesmanInfo.qr" />
      <div class="wechat-qrcode-text">请长按识别二维码</div>
    </van-dialog>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { Dialog } from "vant";
import shareMixin from "@/mixins/share";
import { getUserId } from "@/utils/account";
import { ali } from "@/utils/image";
import { getOffsetTop } from "@/utils/dom";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  mixins: [shareMixin],
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      dataIsLoad: false,
      salesmanInfo: {},
      posterList: [],
      showQrcode: false,
      showWechatQrcode: false,
      swiperActiveIndex: 0,
      swiperOption: {
        autoplay: false,
        setWrapperSize: true,
        observeParents: true,
        pagination: ".swiper-pagination",
        loop: false,
        autoHeight: true,
        autoplayDisableOnInteraction: false, //手动滑动之后，还能保持自动轮播
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    userId() {
      return getUserId();
    },
    shareUserId() {
      return this.$route.query.shareUserId || null;
    },
    isSelf() {
      return !this.shareUserId || this.shareUserId == this.userId;
    }
  },
  mounted() {
    this.setWxShare({
      shareParams: {
        link: `${location.origin}/introduce?shareUserId=${this.shareUserId ||
          this.userId}`
      }
    });
    this.loadData();
  },
  methods: {
    ...mapMutations({
      setLoading: "global/setLoading"
    }),
    ali,
    handleSlideChange() {
      this.swiperActiveIndex = this.$refs.swiper.$swiper.activeIndex;
    },
    loadData() {
      let { shareUserId } = this;
      let postData = {};
      if (shareUserId) postData.userId = shareUserId;
      this.setLoading(true);
      this.$post("/salesmanInfo/findSalesmanInfoById", postData).then(
        ({ data }) => {
          if (data) {
            let { salesmanInfo = {}, posterList = [] } = data;
            this.salesmanInfo = salesmanInfo;
            this.posterList = posterList;
          }
          this.setLoading(false);
          this.dataIsLoad = true;
        }
      );
    },
    handleContactHe() {
      window.scroll({
        top: getOffsetTop(this.$refs["introduce-detail-5"]),
        left: 0,
        behavior: "smooth"
      });
    },
    handleGoBusinessCard() {
      this.$router.push({
        path: "/businessCard"
      });
    },
    handleNoPhone() {
      Dialog({
        title: "",
        message: "用户没有设置手机号",
        confirmButtonText: "知道了"
      });
    },
    handleNoQr() {
      Dialog({
        title: "",
        message: "用户没有设置微信二维码",
        confirmButtonText: "知道了"
      });
    },
    handleAddWechat() {
      this.showWechatQrcode = true;
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  font-family: PingFangSC-Regular, PingFang SC;
  .index-content {
    background: white;
    padding: 30px 15px;
    padding-bottom: 0px;
  }
  .title {
    font-size: 19px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #303133;
    line-height: 26px;
  }
  .share-user-card {
    box-sizing: border-box;
    height: 100px;
    background: #f5f5f5;
    border-radius: 5px;
    margin-top: 30px;
    padding: 18px 10px;
    display: flex;
    align-items: center;
    .left {
      flex: 0 0 64px;
      height: 64px;
      border-radius: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      overflow: hidden;
    }
    .center {
      flex: auto;
      margin-left: 12px;
      .username {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #303133;
        line-height: 25px;
      }
      .phone {
        margin-top: 3px;
        color: rgba(144, 147, 153, 1);
        line-height: 21px;
        font-size: 15px;
      }
    }
    .right {
      flex: 0 0 82px;
      button {
        display: block;
        width: 82px;
        height: 40px;
        line-height: 40px;
        margin: 0;
        padding: 0;
        background: #ff6a00;
        border-radius: 20px;
        font-size: 15px;
        color: white;
        outline: none;
        border: none;
        background: linear-gradient(318deg, #ff832c 0%, #ff6a00 100%);
      }
    }
  }
  .introduce-detail {
    img {
      display: block;
      width: 100%;
      &.introduce-detail-1 {
        height: 538px;
      }
      &.introduce-detail-2 {
        height: 694px;
      }
      &.introduce-detail-3 {
        height: 810px;
      }
      &.introduce-detail-4 {
        height: 924px;
      }
      &.introduce-detail-5 {
        height: 99px;
      }
    }
  }
  .share-user-info {
    height: 200px;
    background: linear-gradient(
      313deg,
      rgba(255, 191, 146, 1) 0%,
      rgba(255, 106, 0, 1) 100%
    );
    margin-top: 58px;
    border-radius: 5px;
    position: relative;
    padding-top: 41px;
    box-sizing: border-box;
    .face {
      position: absolute;
      width: 64px;
      height: 64px;
      top: -32px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
    }
    .username {
      color: white;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
    }
    .company {
      margin-top: 4px;
      color: white;
      font-size: 15px;
      line-height: 21px;
      text-align: center;
    }
    .post {
      margin-top: 4px;
      color: white;
      font-size: 15px;
      line-height: 21px;
      text-align: center;
    }
    .btn-group {
      position: absolute;
      width: 100%;
      top: 134px;
      display: flex;
      justify-content: center;
      button {
        width: 102px;
        height: 40px;
        line-height: 40px;
        margin: 0;
        padding: 0;
        position: relative;
        padding-left: 41px;
        color: #ff6a00;
        font-size: 15px;
        background: white;
        border-radius: 20px;
        border: none;
        margin-right: 76px;
        text-align: left;
        &:last-child {
          margin-right: 0;
        }
        img {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          &.call {
            width: 20px;
            height: 20px;
          }
          &.wechat {
            width: 20px;
            height: 16px;
          }
        }
        &.noContent {
          box-sizing: border-box;
          background: white;
          color: #ff6a00;
          // border: 1px solid #ff6a00;
          padding-left: 0;
          text-align: center;
        }
        a {
          text-decoration: none;
          color: #ff6a00;
        }
      }
    }
    .edit-card-btn {
      position: absolute;
      right: 0;
      top: 30px;
      text-align: center;
      width: 74px;
      height: 27px;
      line-height: 27px;
      background: rgba(255, 106, 0, 0.5);
      border-radius: 50px 0px 0px 50px;
      font-size: 15px;
      color: white;
    }
  }
  .share-user-info-imgs {
    // border: 1px dashed #ff6a00;
    // background: #f5f5f5;
    margin-top: 15px;
    border-radius: 5px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }
  .share-user-info-detail {
    background: #f5f5f5;
    border-radius: 5px;
    padding: 12px 10px;
    margin-top: 7px;
    .share-user-info-detail-content {
      background: white;
      padding: 12px 9px;
      .share-user-info-detail-item {
        border-radius: 2px;
        line-height: 22px;
        margin-bottom: 12px;
        display: flex;
        font-size: 15px;
        align-items: flex-start;
        &:last-child {
          margin-bottom: 0;
        }
        .left {
          flex: 0 0 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 22px;
          img {
            width: 18px;
            // &.yx {
            //   width: 17.5px;
            // }
            // &.dz {
            //   width: 14px;
            // }
            // &.wz {
            //   width: 18px;
            // }
            // &.grjj {
            //   width: 14.5px;
            // }
          }
        }
        .right {
          flex: auto;
          color: #4b4c4e;
          margin-left: 12px;
          font-size: 15px;
        }
        &.share-user-info-detail-item-grjj {
          padding-bottom: 5px;
          .right {
            box-sizing: border-box;
            word-break: break-all;
            margin-left: 0;
          }
        }
      }
    }
  }
  .logo-wrap {
    img {
      display: block;
      width: 82px;
      height: 18px;
      margin: 0 auto;
      padding: 16px 0;
      background: white;
    }
  }
  .bottom-btn {
    height: 72px;
    .bottom-btn-fixed {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 10;
      width: 100%;
      background: white;
      padding: 12px;
      box-sizing: border-box;
      border-top: 1px solid #eeeeee;
      button {
        font-family: PingFangSC-Regular, PingFang SC;
        display: block;
        width: 100%;
        height: 48px;
        line-height: 48px;
        margin: 0;
        padding: 0;
        position: relative;
        color: white;
        font-size: 18px;
        background: #ff6a00;
        border: none;
        background: linear-gradient(318deg, #ff832c 0%, #ff6a00 100%);
        border-radius: 25px;
      }
    }
  }

  .gzh-qrcode-dialog {
    .dialog-title {
      font-size: 15px;
      text-align: center;
      padding-top: 20px;
    }
    .gzh-qrcode {
      display: block;
      width: 280px;
      height: 280px;
      margin: 0 auto;
    }
    .dialog-bottom {
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      padding: 0px 0px 20px 0px;
    }
  }
  .wechat-qrcode-dialog {
    padding: 10px;
    .wechat-qrcode {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
    .wechat-qrcode-text {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      padding: 20px 0;
    }
  }
  & /deep/ .swiper-container {
    position: relative;
  }
  .c-swiper-pagination {
    position: absolute;
    z-index: 9;
    right: 10px;
    bottom: 10px;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    color: white;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 14px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    outline: none;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 100%;
    overflow: hidden;
    width: 48px;
    height: 48px;
    line-height: 48px;
    &:after {
      color: #ff6a00;
      font-size: 28px;
    }
  }
}
</style>
