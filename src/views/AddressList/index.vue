<template>
  <div class="page-address-list">
    <div class="address-list-container">
      <!-- <div class="get-wx-address flex-between" @click="getWXAddress">
      <div class="get-wx-address-left">
        <img
          class="wx-icon"
          :src="require('@/assets/images/weixin_icon.png')"
          alt="微信图标"
        />
        <div class="get-wx-adress-text">获取微信收货地址</div>
      </div>
      <div class="get-wx-address-right">
        <IconFont type="iconqianjin" fontStyle="font-size: 15px;color:#ccc" />
      </div>
    </div>-->
      <div class="address-list">
        <template v-for="item in canUseList">
          <AddressItem
            :key="item.userReceivingAddressId"
            :item="item"
            @choose-address="onTapAddress"
          />
        </template>
      </div>

      <!-- 超出配送范围 -->
      <div class="invalid-list" v-if="notUseList && notUseList.length">
        <div class="title">超出配送范围地址</div>
        <div class="address-list">
          <template v-for="item in notUseList">
            <AddressItem
              :key="item.userReceivingAddressId"
              :item="item"
              :invalid="true"
            />
          </template>
        </div>
      </div>

      <div @click="goAddAddress({})" class="footer-btns">
        <button>新增收货地址</button>
      </div>
    </div>
  </div>
</template>

<script>
import { parse } from "querystring";
import areaList from "@/utils/area.js";
import Cfg from "@/config/index";
import AddressItem from "./components/AddressItem";

export default {
  props: ["redirectUrl", "type", "skuIds", "skuNums"],
  components: {
    AddressItem
  },
  data() {
    return {
      canUseList: [],
      notUseList: []
    };
  },
  computed: {
    skus() {
      let { skuIds, skuNums } = this;
      skuIds = skuIds.split(",");
      skuNums = skuNums.split(",");
      return skuIds.map((skuId, i) => {
        return {
          onlineStoreSingleProductOutId: skuId,
          onlineStoreSingleProductOrderCount: Number(skuNums[i])
        };
      });
    }
  },
  created() {
    this.loadData();
  },
  mounted() {},
  methods: {
    // 跳转地址详情页
    goAddAddress(query) {
      this.$push({ path: "/addAddress", query });
    },

    // 格式化列表
    formatAddressList(data) {
      return data.map(item => {
        const phone = item.userConsigneePhone;
        const formatPhone = phone.replace(phone.substr(3, 4), "****");
        item.userConsigneePhoneFormat = formatPhone;
        return item;
      });
    },

    loadData() {
      if (this.type == 1) {
        // type:1 代表是选择地址
        this.checkconsigneeAddressList();
      } else {
        this.getAddressList();
      }
    },

    checkconsigneeAddressList() {
      this.$fetchPost("/order/mobile/tenantOrder/checkconsigneeAddressList", {
        storeOutId: Cfg.mainStoreId,
        onlineStoreSingleProductOutIdList: this.skus
      }).then(({ data }) => {
        this.canUseList = this.formatAddressList(data.canUseList);
        this.notUseList = this.formatAddressList(data.notUseList);
      });
    },
    // 初始化请求获取地址列表
    getAddressList() {
      const api =
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressByUserId";
      this.$fetchGet(api).then(({ data }) => {
        data = this.formatAddressList(data);
        this.canUseList = data;
      });
    },

    // api请求添加地址
    addUserReceivingAddress(params) {
      const api =
        "/order/mobile/tenantUserReceivingAddress/addUserReceivingAddress";
      this.$fetchPost(api, params).then(() => {
        this.loadData();
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
    onTapAddress({ item }) {
      // 需要上个页面配合
      // 1.query里面有redirectUrl地址  redirectUrl='/aaaPage'
      // 2.地址列表页带过去query里面有地址的addressId addressId:2
      let { redirectUrl } = this;

      if (redirectUrl && redirectUrl !== "undefined") {
        let path = redirectUrl.split("?")[0];
        let query = parse(redirectUrl.split("?")[1]);

        this.$push({
          path,
          query: { ...query, addressId: item.userReceivingAddressId }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page-address-list {
  background: #f8f8f8;
  padding-bottom: calc(env(safe-area-inset-bottom) + 65px);
  box-sizing: border-box;
}

.address-list-container {
  position: relative;
  padding-bottom: calc(env(safe-area-inset-bottom) + 67px);

  .get-wx-address {
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 0px 8px 8px;

    .get-wx-address-left {
      display: flex;
      align-items: center;

      .wx-icon {
        margin-right: 9.5px;
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
  }

  .invalid-list {
    .title {
      height: 16px;
      line-height: 16px;
      color: #999;
      text-indent: 15px;
      font-size: 12px;
      margin-top: 20px;
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
    button {
      width: 351px;
      padding: 0;
      height: 36px;
      line-height: 36px;
      background: rgba(255, 106, 0, 1);
      border-radius: 18px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
    }
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 13.5px 0 15px;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
