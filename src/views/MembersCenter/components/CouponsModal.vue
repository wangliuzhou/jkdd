<template>
  <div v-if="show" class="modal-component">
    <div class="modal-wrap">
      <img
        src="@/assets/images/members/gift_bag.png"
        class="top-img"
        fit="cover"
      />
      <div class="modal-body">
        <div class="header">开卡成功！获得等级礼包</div>
        <div class="main">
          <div style="padding-bottom:80rpx">
            <div v-for="(item, index) in list" :key="index">
              <CouponItem :item="item" />
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="bg"></div>
          <div class="btn" @click="goHome">去使用</div>
          <div class="remarks">礼包奖励已发送您账户</div>
        </div>
      </div>
      <div class="cancel-btn" @click="cancelModal">
        <IconFont
          type="iconjiaoyiguanbi"
          fontStyle="font-size:60rpx;color:#ffffff"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import IconFont from "@/components/IconFont";
import CouponItem from "./CouponItem";
export default {
  components: { CouponItem, IconFont },
  props: {},
  data() {
    return {
      show: false,
      list: []
    };
  },
  computed: {},
  methods: {
    handleTouchMove() {},
    showModal(list) {
      this.show = true;
      this.list = list;
    },
    cancelModal() {
      this.show = false;
      this.$router.replace("/");
    },
    goHome() {
      this.cancelModal();
    }
  }
};
</script>
<style lang="less" scoped>
.modal-component {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #0000008e;
  z-index: 99;

  .modal-wrap {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 323px;
    height: 401px;
    background: linear-gradient(135deg, #ee4544 0%, #ec3d40 100%);
    border-radius: 12px;

    .top-img {
      position: absolute;
      width: 191px;
      height: 136px;
      top: 0%;
      left: 50%;
      transform: translate(-50%, -60%);
    }

    .modal-body {
      .header {
        margin-top: 29px;
        height: 27px;
        font-size: 19px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 27px;
        text-align: center;
      }

      .main {
        width: 298px;
        height: 299px;
        background: #df1e25;
        border-radius: 7px;
        margin: 14px auto 0;
        overflow-y: scroll;
        padding: 17px 18px 30px 18px;
        box-sizing: border-box;
      }

      .footer {
        position: absolute;
        bottom: 0;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        transform: translate(-50%, 0);
        width: 100%;
        height: 87px;
        overflow: hidden;
        padding-bottom: 10px;
        box-sizing: border-box;
        border-radius: 0 0 7px 7px;
        z-index: 3;

        .bg {
          width: 750px;
          height: 750px;
          position: absolute;
          left: 50%;
          bottom: calc(-750px + 87px);
          transform: translate(-50%, 0);
          z-index: -1;
          border-radius: 50%;
          background: linear-gradient(135deg, #e52e31 0%, #ff7071 100%);
        }

        .btn {
          width: 187px;
          height: 39px;
          background: linear-gradient(127deg, #fff1a6 0%, #ffde6d 100%);
          box-shadow: 0 2px 4px 0 rgba(229, 46, 49, 1);
          border-radius: 19px;
          text-align: center;
          line-height: 39px;
        }

        .remarks {
          margin-top: 4px;
          height: 16px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffe5be;
          line-height: 16px;
        }
      }
    }

    .cancel-btn {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translate(-50%, 100%);
    }
  }
}
</style>
