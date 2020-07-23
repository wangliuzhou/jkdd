<template>
  <div class="page-official-account-qrcode">
    <div class="showcase-official-account-qrcode">
      <div class="showcase-official-account-qrcode__card">
        <img
          :src="$attrs.gzhQrcode"
          class="showcase-official-account-qrcode__qrcode"
          alt="二维码"
        />
        <div class="showcase-official-account-qrcode__footer">
          <img
            :src="require('@/assets/images/zhiwen.png')"
            class="showcase-official-account-qrcode__fingerprint"
            alt="指纹"
          />
          <div class="showcase-official-account-qrcode__notice">
            <p>长按识别二维码</p>
            <p>关注公众号获取优惠信息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.page-official-account-qrcode {
  .showcase-official-account-qrcode {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    z-index: 2000;
    .showcase-official-account-qrcode__card {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2001;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 311px;
      height: 374px;
      background: #fff;
      border-radius: 6px;
      .showcase-official-account-qrcode__qrcode {
        width: 255px;
        height: 255px;
      }
      .showcase-official-account-qrcode__footer {
        display: flex;
        height: 45px;
        align-items: center;
        .showcase-official-account-qrcode__fingerprint {
          width: 45px;
          height: 45px;
        }
        .showcase-official-account-qrcode__notice {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          height: 45px;
          margin-left: 14.5px;
          text-align: left;
          font-size: 15px;
          color: #333;
          p {
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
