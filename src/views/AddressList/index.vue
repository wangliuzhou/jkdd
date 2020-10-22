<template>
  <div class="address-list-container">
    <div class="get-wx-address flex-between" @click="getWXAddress">
      <div class="get-wx-address-left">
        <img
          class="wx-icon"
          :src="require('@/assets/images/weixin_icon.png')"
        />
        <div class="get-wx-adress-text">获取微信收货地址</div>
      </div>
      <div class="get-wx-address-right">
        <IconFont type="iconqianjin" fontStyle="font-size: 15px;color:#ccc" />
      </div>
    </div>
    <div class="address-list">
      <div
        v-for="item in addressList"
        :key="item.userReceivingAddressId"
        class="address-item flex-between"
      >
        <div
          class="address-item-left"
          @click="onTapAddress(item.userReceivingAddressId)"
        >
          <div class="name-phone-tags">
            <span>{{ item.userConsigneeName }}</span>
            <span class="phone">{{ item.userConsigneePhoneFormat }}</span>
            <div class="tag default-tag" v-if="item.isDefault === 1">默认</div>
            <div class="tag" v-if="item.tenantUserReceivingAddressLabel">
              {{
                item.tenantUserReceivingAddressLabel
                  .userReceivingAddressLabelName || ""
              }}
            </div>
          </div>
          <div class="address-text">
            {{ item.userAddressProvince }}{{ item.userAddressCity
            }}{{ item.userAddressDistrict }}{{ item.userAddressDetail }}
          </div>
        </div>
        <div @click="goAddAddress({ id: item.userReceivingAddressId })">
          <IconFont type="iconbianji" fontStyle="font-size: 15px;color:#ccc" />
        </div>
      </div>
    </div>
    <div @click="goAddAddress({})" class="footer-btns">
      <div>新增收货地址</div>
    </div>
  </div>
</template>

<script>
import areaList from "@/utils/area.js";
export default {
  data() {
    return {
      addressList: [
        // {
        //   userReceivingAddressId: 1,
        //   isDefault: 1
        // },
        // {
        //   userReceivingAddressId: 2,
        //   isDefault: 0,
        //   tenantUserReceivingAddressLabel: {
        //     userReceivingAddressLabelName: "公司"
        //   }
        // }
      ]
    };
  },
  created() {
    this.getAddressList();
  },
  mounted() {},
  methods: {
    // 跳转地址详情页
    goAddAddress(query) {
      this.$push({ path: "/addAddress", query });
    },

    // 格式化列表
    formatAddressList(data) {
      data.map(item => {
        const phone = item.userConsigneePhone;
        const formatPhone = phone.replace(phone.substr(3, 4), "****");
        item.userConsigneePhoneFormat = formatPhone;
      });
      this.addressList = data;
    },

    // 初始化请求获取地址列表
    getAddressList() {
      const api =
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressByUserId";
      this.$fetchGet(api).then(({ data }) => {
        this.formatAddressList(data);
      });
    },

    // api请求添加地址
    addUserReceivingAddress(params) {
      const api =
        "/order/mobile/tenantUserReceivingAddress/addUserReceivingAddress";
      this.$fetchPost(api, params).then(() => {
        this.getAddressList();
      });
    },

    // 获取到微信地址后设置
    setAddress(addressObj) {
      const {
        cityName,
        countyName,
        detailInfo,
        provinceName,
        telNumber,
        userName
      } = addressObj;
      const userPcds = [];
      const provinceKeys = Object.keys(areaList["province_list"]);
      provinceKeys.map(item => {
        if (areaList["province_list"][item] === provinceName) {
          userPcds[0] = item;
        }
      });
      const cityKeys = Object.keys(areaList["city_list"]);
      cityKeys.map(item => {
        if (areaList["city_list"][item] === cityName) {
          userPcds[1] = item;
        }
      });
      const countyKeys = Object.keys(areaList["county_list"]);
      countyKeys.map(item => {
        if (areaList["county_list"][item] === countyName) {
          userPcds[2] = item;
        }
      });
      const params = {
        userPcds,
        userConsigneeName: userName,
        userConsigneePhone: telNumber,
        userAddressDetail: detailInfo,
        isDefault: 0,
        tenantUserReceivingAddressLabel: {},
        userAddressProvince: provinceName,
        userAddressCity: cityName,
        userAddressDistrict: countyName
      };
      this.addUserReceivingAddress(params);
    },

    // 获取微信地址
    getWXAddress() {
      const that = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.address"]) {
            wx.chooseAddress({
              success(res) {
                that.setAddress(res);
              }
            });
          } else {
            if (res.authSetting["scope.address"] == false) {
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting);
                }
              });
            } else {
              wx.chooseAddress({
                success(res) {
                  that.setAddress(res);
                }
              });
            }
          }
        }
      });
    },

    // 点击某个地址
    onTapAddress(addressId) {
      // 需要上个页面配合
      // 1.query里面有redirectUrl地址  redirectUrl='/aaaPage'
      // 2.地址列表页带过去query里面有地址的addressId addressId:2
      const { redirectUrl } = this.$route.query;
      if (redirectUrl) {
        this.$push({
          path: redirectUrl,
          query: { addressId }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
page {
  background: #f8f8f8;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
}

.address-list-container {
  position: relative;

  .get-wx-address {
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 0px 8px 8px;

    .get-wx-address-left {
      display: flex;
      align-items: center;

      .wx-icon {
        margin-right: 10px;
        width: 24px;
        height: 24px;
      }

      .get-wx-adress-text {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .address-list {
    .address-item {
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      height: 78px;
      margin-top: 8px;

      &:nth-last-child(1) {
        margin-bottom: 65px;
      }

      .address-item-left {
        .name-phone-tags {
          display: flex;
          align-items: center;
          color: #333333;

          .phone {
            margin: 0 6px;
          }

          .tag {
            margin-right: 3px;
            padding: 0 5px;
            min-width: 32px;
            box-sizing: border-box;
            height: 16px;
            border-radius: 8px;
            border: 1px solid rgba(255, 106, 0, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffe9d9;
            font-size: 12px;
            color: rgba(255, 106, 0, 1);
          }

          .default-tag {
            background: #fff;
          }
        }

        .address-text {
          color: #666666;
          margin-top: 8px;
        }
      }
    }
  }

  .footer-btns {
    height: 56px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: env(safe-area-inset-bottom);

    div {
      width: 351px;
      height: 36px;
      background: rgba(255, 106, 0, 1);
      border-radius: 18px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 14px 0 15px;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
