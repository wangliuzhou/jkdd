<template>
  <div class="join-member-page">
    <div class="member-card">
      <img
        src="../../assets/images/members/card_ordinary_bg.png"
        class="card-bg"
        fit="cover"
      />
      <div class="member-card-body">
        <div class="card-header">成为会员，尊享会员特权</div>
        <div class="card-main">
          会员尊享卡
          <img
            src="../../assets/images/members/joinMember/VIP-1.png"
            class="vip-logo"
            fit="cover"
          />
        </div>
      </div>
      <div class="card-footer">
        <div class="interests-list">
          <div
            class="interests-item"
            v-for="item in interestsList"
            :key="item.name"
          >
            <van-image :src="item.icon" class="icon" fit="cover" />
            <div class="label">{{ item.name }}</div>
          </div>
        </div>
        <div class="form-wrap">
          <img
            src="../../assets/images/members/joinMember/huiyuanbeijing.png"
            class="right-icon"
            fit="cover"
          />
          <div class="form-header">
            <div class="title">完善信息</div>
            <img
              src="../../assets/images/members/joinMember/VIP-2.png"
              class="icon"
              fit="cover"
            />
          </div>
          <div class="form-list">
            <div
              class="form-item"
              v-for="(item, index) in formList"
              :key="index"
            >
              <div class="label">{{ item.fieldName }}</div>
              <div class="value">
                <input
                  v-if="item.dateType === 1"
                  class="input"
                  placeholder-class="placeholder-style"
                  @change="
                    handleSelectorChange($event.target.value, item.field)
                  "
                  :value="formValues[item.field]"
                  :placeholder="
                    '请输入' + item.fieldName + (item.isWrite ? ' (必填)' : '')
                  "
                  style="width:100%"
                />
                <XzRadio
                  v-if="item.dateType === 2"
                  @onChange="handleSelectorChange($event, item.field)"
                  style="width:100%"
                ></XzRadio>
                <XzPicker
                  v-if="item.dateType === 3 || item.dateType === 4"
                  :mode="item.dateType === 3 ? 'date' : 'region'"
                  @onChange="handleSelectorChange($event, item.field)"
                  :placeholder="
                    '请选择' + item.fieldName + (item.isWrite ? ' (必填)' : '')
                  "
                  style="width:100%"
                ></XzPicker>
              </div>
            </div>
          </div>
          <div class="sumibt-btn" @click="onSubmit">确定</div>
        </div>
      </div>
      <CouponsModal ref="couponsModal" />
    </div>
  </div>
</template>
<script>
import CouponsModal from "../MembersCenter/components/CouponsModal";
import XzPicker from "./components/xzPicker";
import XzRadio from "./components/xzRadio";
import jifenbeilvIcon from "@/assets/images/members/joinMember/jifenbeilv.png";
import songyouhuiquanIcon from "@/assets/images/members/joinMember/songyouhuiquan.png";
import songjifenIcon from "@/assets/images/members/joinMember/songjifen.png";
import songzengpinIcon from "@/assets/images/members/joinMember/songzengpin.png";
import gengduoquanyiIcon from "@/assets/images/members/joinMember/gengduoquanyi.png";
import { Toast } from "vant";
export default {
  components: { CouponsModal, XzPicker, XzRadio },
  data() {
    return {
      formList: [],
      storeOuterId: "TSRORVZ17ZXD9",
      formValues: {},
      userInfo: {},
      interestsList: [
        {
          name: "积分倍率",
          icon: jifenbeilvIcon
        },
        {
          name: "送优惠券",
          icon: songyouhuiquanIcon
        },
        {
          name: "送积分",
          icon: songjifenIcon
        },
        {
          name: "送赠品",
          icon: songzengpinIcon
        },
        {
          name: "更多权益",
          icon: gengduoquanyiIcon
        }
      ]
    };
  },
  mounted() {
    this.getFormList();
  },
  computed: {},
  methods: {
    async getFormList() {
      const { storeOuterId, userInfo } = this;
      const { data } = await this.$fetchGet(
        "/client/mobile/tenantUserField/findTenantUserFieldPitchON",
        {
          storeOuterId
        }
      );
      let formValues = {};
      if (data.find(d => d.field === "user_phone")) {
        formValues.user_phone = userInfo.userPhone;
      }
      if (data.find(d => d.field === "user_gender")) {
        formValues.user_gender = "1";
      }
      this.formList = data;
      this.formValues = formValues;
    },
    async onSubmit() {
      if (!this.checkFormValues()) {
        return;
      }
      const { storeOuterId } = this;
      try {
        Toast.loading({
          forbidClick: true
        });
        const { code, data } = await this.$fetchPost(
          "/client/mobile/tenantMemberCardOption/getMemberCard",
          {
            storeOuterId: storeOuterId,
            fieldJson: JSON.stringify(this.formValues)
          }
        );
        Toast.clear();
        Toast("领取成功!");
        //弹窗
        if (code === 200 && Array.isArray(data) && data.length > 0) {
          this.$refs.couponsModal.showModal(data);
        } else {
          const timer = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(timer);
          }, 1500);
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkFormValues() {
      let { formList, formValues } = this;
      for (let item of formList) {
        if (item.isWrite) {
          if (!formValues[item.field]) {
            Toast(`您未填写${item.fieldName}`);
            return false;
          }
        }
      }
      return true;
    },
    handleSelectorChange(e, type) {
      let values = { ...this.formValues };
      values[type] = e;
      this.formValues = values;
    }
  }
};
</script>
<style lang="less" scoped>
.join-member-page {
  padding: 10px 0 60px 0;
  box-sizing: border-box;
  min-height: 100vh;
  background: #f5f5f5;
  .member-card {
    position: relative;
    width: 339px;
    height: 162px;
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    box-sizing: border-box;
    // padding: 22px 12px;

    .card-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .member-card-body {
      padding: 22px 12px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      .card-header {
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 21px;
        margin-bottom: 25px;
      }

      .card-main {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 33px;
        display: flex;
        align-items: center;

        .vip-logo {
          width: 33px;
          margin-left: 10px;
        }
      }
    }

    .card-footer {
      position: absolute;
      left: -5px;
      top: 112px;
      width: 350px;
      height: 81px;

      .interests-list {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: #373d41;
        border-radius: 8px 8px 0 0;

        .interests-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
          width: 20%;
          height: 100%;

          .icon {
            margin-top: 12px;
            width: 28px;
          }

          .label {
            margin-top: 6px;
            height: 12px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffe9d9;
            line-height: 12px;
          }
        }
      }

      .form-wrap {
        position: absolute;
        left: 0;
        top: 68px;
        width: 350px;
        min-height: 100px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.11);
        box-sizing: border-box;
        padding: 19px 26px 26px;

        .right-icon {
          position: absolute;
          right: 0;
          top: 0;
          width: 97px;
          height: 80px;
        }

        .form-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 7px;

          .title {
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #c0c4cc;
            line-height: 22px;
          }

          .icon {
            width: 32px;
          }
        }

        .form-list {
          .form-item {
            display: flex;
            align-items: center;
            height: 46px;

            .label {
              width: 86px;
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #606266;
            }

            .value {
              flex: 1;
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 21px;
              height: 100%;
              display: flex;
              align-items: center;
              .input {
                border: none;
                height: 100%;
              }

              .placeholder-style {
                color: #c0c4cc;
              }
            }
          }
        }

        .sumibt-btn {
          position: fixed;
          bottom: 12px;
          left: 12px;
          z-index: 4;
          width: 351px;
          height: 44px;
          background: linear-gradient(317deg, #ffbf92 0%, #ff6a00 100%);
          border-radius: 24px;
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 44px;
          text-align: center;
        }
      }
    }
  }
}
</style>
