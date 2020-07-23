<template>
  <div class="increase-fans-container">
    <img :src="$ali(item.banner, 375)" alt="引导图" @click="handleClick" />
    <div
      v-if="showGzhInfo && item.increaseFansType == 2"
      class="gzh-info"
      @click="showGzhInfo = false"
    >
      <div class="gzh-info__inner">
        <div class="gzh-info-follow">
          <!---->
          <div class="gzh-info-follow__wxid">
            <img :src="item.gzhQrcode" alt="公众号二维码" />
          </div>
          <div class="gzh-info-copyright">
            <p class="gzh-info-follow__text">
              长按图片【识别二维码】关注公众号
            </p>
            <p class="gzh-info-follow__text-title">你还可以</p>
            <p class="gzh-info-follow__text-step">1.打开微信，点击‘添加朋友’</p>
            <p class="gzh-info-follow__text-step">2.点击“公众号”</p>
            <p class="gzh-info-follow__text-step">
              3.搜索公众号：{{ item.gzhName }}
            </p>
            <p class="gzh-info-follow__text-step">4.点击“关注”，完成</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      showGzhInfo: false
    };
  },
  methods: {
    handleClick() {
      let {
        item: { increaseFansType, activityQrcodeInfo }
      } = this;
      if (increaseFansType == 1) {
        let url = "";
        if (activityQrcodeInfo.activeQrcodeType == 0) {
          //个人活码
          url = `/qrcodeDetail?activeQrcodeOuterId=${activityQrcodeInfo.activeQrcodeOuterId}`;
        } else if (activityQrcodeInfo.activeQrcodeType == 1) {
          //群活码
          url = `/qrcodeIntroduction?activeQrcodeOuterId=${activityQrcodeInfo.activeQrcodeOuterId}`;
        }
        this.$router.push({
          path: url
        });
      } else if (increaseFansType == 2) {
        //引导关注公众号
        this.showGzhInfo = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.increase-fans-container {
  img {
    display: block;
    width: 100%;
  }
  .gzh-info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    z-index: 2000;
    .gzh-info__inner {
      margin: 0 auto;
      width: 320px;
      padding-top: 48px;
      .gzh-info-follow {
        .gzh-info-follow__wxid {
          display: inline-block;
          margin-bottom: 15px;
          font-size: 18px;
          text-align: left;
        }
        .gzh-info-follow__wxid {
          display: inline-block;
          margin-bottom: 15px;
          font-size: 18px;
          text-align: left;
          img {
            margin-top: 20px;
            width: 200px;
            height: 200px;
          }
        }
        .gzh-info-copyright {
          .gzh-info-follow {
            .gzh-info-copyright {
              & > p {
                line-height: 1.2;
              }
            }
          }
          .gzh-info-follow__text {
            padding-bottom: 20px;
            border-bottom: 1px solid #666;
            color: #fff;
            font-size: 16px;
          }
          .gzh-info-follow__text-title {
            margin: 15px 0;
            font-size: 20px;
            color: #fff;
          }
          .gzh-info-follow__text-step {
            margin-bottom: 10px;
            padding-left: 56px;
            color: #fff;
            font-size: 16px;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
