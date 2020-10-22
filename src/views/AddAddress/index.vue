<template>
  <div class="address-list-container">
    <div class="get-wx-address-left"></div>
    <div class="get-wx-address flex-between" @click="getWXAddress">
      <div class="get-wx-address-left">
        <img class="wx-icon" src="~@/assets/images/weixin_icon.png" />
        <div class="get-wx-adress-text">获取微信收货地址</div>
      </div>
      <div class="get-wx-address-right">
        <IconFont type="iconqianjin" fontStyle="font-size: 30rpx;color:#ccc" />
      </div>
    </div>
    <div class="address-content">
      <div class="address-content-detail">
        <van-field
          label="收货人"
          placeholder="收货人姓名"
          v-model="userConsigneeName"
        />
        <van-field
          type="tel"
          label="手机号码"
          placeholder="收货人手机号"
          v-model="userConsigneePhone"
        />
        <van-field
          label="所在地区"
          placeholder="选择省/市/区"
          v-model="areaValueCh"
          @focus="onSelectAreaInputFocus"
        />
        <van-popup v-model="popupShow" position="bottom" @close="onPopupClose">
          <van-area
            title="收货地址"
            :area-list="areaList"
            :value="userPcds[2]"
            :columns-placeholder="['请选择', '请选择', '请选择']"
            @confirm="areaConfirm"
            @cancel="onPopupClose"
          />
        </van-popup>
        <van-field
          v-model="userAddressDetail"
          label="详细地址"
          placeholder="街道、门牌号等"
        />
      </div>
      <div class="address-content-detail">
        <div class="tags-card">
          <div class="title">标签</div>
          <div class>
            <div class="tags-list">
              <div
                v-for="(item, index) in tagsList"
                :key="index"
                class="tag"
                :class="{ 'choosed-tag': choosedTagIndex === index }"
                @click="tapTag(index)"
              >
                {{ item.userReceivingAddressLabelName }}
              </div>
              <div class="tag" @click="tapAddTagBtn">+</div>
            </div>
            <input
              class="add-tag-input"
              v-if="showAddTagInput"
              v-model="userReceivingAddressLabelName"
              placeholder="请输入标签"
              @keyup.enter="onAddTagConfirm"
            />
          </div>
        </div>
      </div>
      <div class="address-content-detail">
        <div class="public flex-between">
          <div>设为默认地址</div>
          <van-switch size="22" v-model="isDefault" active-color="#ff6a00" />
        </div>
      </div>
    </div>
    <div class="footer-btns">
      <div @click="submitAddress">保存并使用</div>
      <button
        v-if="showDeleteBtn"
        @click="deleteAddress"
        class="delete-address"
      >
        删除
      </button>
    </div>
  </div>
</template>

<script>
import areaList from "@/utils/area.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      aaa: "",
      tagsList: [
        {
          userReceivingAddressLabelName: "家"
        },
        {
          userReceivingAddressLabelName: "公司"
        },
        {
          userReceivingAddressLabelName: "学校"
        }
      ],
      choosedTagIndex: -1,
      showDeleteBtn: false,
      popupShow: false,
      showAddTagInput: false,
      areaList: areaList,
      areaValueCh: "",

      userConsigneeName: "",
      userConsigneePhone: "",
      userPcds: [],
      userAddressProvince: "", // 省、市、区、详细地址
      userAddressCity: "",
      userAddressDistrict: "",
      userAddressDetail: "",
      userReceivingAddressLabelName: "",
      isDefault: false
    };
  },
  created() {
    console.log("id==>", this.$route.query.id);
    // this.setTitle();
    if (this.$route.query.id) {
      this.findUserReceivingAddressById();
    }
  },
  mounted() {},
  methods: {
    // 选择标签
    tapTag(index) {
      const { choosedTagIndex } = this;
      this.choosedTagIndex = index === choosedTagIndex ? -1 : index;
    },

    // 点击添加标签Icon
    tapAddTagBtn() {
      this.showAddTagInput = !this.showAddTagInput;
    },

    // 输入tag文字,点击确定后
    onAddTagConfirm() {
      const { tagsList, userReceivingAddressLabelName } = this;
      tagsList.push({ userReceivingAddressLabelName });
      this.tagsList = tagsList;
      this.showAddTagInput = false;
      this.choosedTagIndex = tagsList.length - 1;
      this.userReceivingAddressLabelName = "";
    },

    // 点击保存并使用按钮
    submitAddress() {
      const { id } = this.$route.query;
      console.log("submit", this, id);
      id ? this.updateUserReceivingAddress() : this.addUserReceivingAddress();
    },

    // 添加和编辑时候要格式化数据
    formatParams() {
      const { isDefault, tagsList, choosedTagIndex } = this;
      const params = {
        userConsigneeName: this.userConsigneeName,
        userConsigneePhone: this.userConsigneePhone,
        userPcds: this.userPcds,
        userAddressDetail: this.userAddressDetail,
        isDefault: Number(isDefault),
        tenantUserReceivingAddressLabel: {},
        userAddressProvince: this.userAddressProvince,
        userAddressCity: this.userAddressCity,
        userAddressDistrict: this.userAddressDistrict
      };
      if (choosedTagIndex > -1) {
        const name = tagsList[choosedTagIndex].userReceivingAddressLabelName;
        params.tenantUserReceivingAddressLabel.userReceivingAddressLabelName = name;
      }
      // 编辑时候入参加上id
      if (this.$route.query.id) {
        params.userReceivingAddressId = this.$route.query.id;
      }
      return params;
    },

    // api请求添加地址
    addUserReceivingAddress() {
      const api =
        "/order/mobile/tenantUserReceivingAddress/addUserReceivingAddress";
      const params = this.formatParams();
      this.$fetchPost(api, params).then(() => {
        this.refreshPage();
        Toast("添加成功");
      });
    },

    // api请求编辑地址
    updateUserReceivingAddress() {
      const api =
        "/order/mobile/tenantUserReceivingAddress/updateUserReceivingAddress";
      const params = this.formatParams();
      this.$fetchPost(api, params).then(() => {
        this.refreshPage();
        Toast("修改成功");
      });
    },

    // 删除地址
    deleteAddress() {
      const userReceivingAddressId = this.$route.query.id;
      const api =
        "/order/mobile/tenantUserReceivingAddress/deleteUserReceivingAddress";
      this.$fetchPost(api, { userReceivingAddressId }).then(() => {
        this.refreshPage();
      });
    },

    onPopupClose() {
      this.popupShow = false;
    },
    onSelectAreaInputFocus() {
      this.popupShow = true;
    },

    // 选择省市区
    areaConfirm(values) {
      const userAddressProvince = values[0].name;
      const userAddressCity = values[1].name;
      const userAddressDistrict = values[2].name;

      this.userAddressProvince = userAddressProvince;
      this.userAddressCity = userAddressCity;
      this.userAddressDistrict = userAddressDistrict;
      this.userPcds = values.map(item => item.code);
      this.areaValueCh = `${userAddressProvince}/${userAddressCity}/${userAddressDistrict}`;
      this.popupShow = false;
      console.log(this.userPcds);
    },

    // 判断是添加还是编辑
    setTitle() {
      if (this.$route.query.id) {
        this.showDeleteBtn = true;
        document.title = "编辑收货地址";
      } else {
        document.title = "新增收货地址";
      }
    },

    // 格式化根据id得到的地址数据
    formatFetchData(data) {
      const {
        userAddressProvince,
        userAddressCity,
        userAddressDistrict
      } = data;
      this.userConsigneeName = data.userConsigneeName;
      this.userConsigneePhone = data.userConsigneePhone;
      this.userPcds = data.userPcds;
      this.isDefault = Boolean(data.isDefault);
      this.areaValueCh = `${userAddressProvince}/${userAddressCity}/${userAddressDistrict}`;
      this.userAddressDetail = data.userAddressDetail;
      this.userAddressProvince = userAddressProvince;
      this.userAddressCity = userAddressCity;
      this.userAddressDistrict = userAddressDistrict;
    },

    // 根据id查询地址信息
    findUserReceivingAddressById() {
      const api =
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressById";
      this.$fetchGet(api, {
        userReceivingAddressId: this.$route.query.id
      }).then(({ data }) => {
        this.formatFetchData(data);
        // 处理标签显示
        if (data.tenantUserReceivingAddressLabel) {
          this.findUserReceivingAddressLabelByUserId(
            data.tenantUserReceivingAddressLabel.userReceivingAddressLabelName
          );
        }
      });
    },

    // 增删改接口成功之后，获取页面栈，发出请求
    refreshPage() {
      this.$router.go(-1);
    },

    // 查询用户收货地址标签
    findUserReceivingAddressLabelByUserId(chooseName) {
      const api =
        "/order/mobile/tenantUserReceivingAddressLabel/findUserReceivingAddressLabelByUserId";
      this.$fetchGet(api).then(({ data }) => {
        this.formatTags(data, chooseName);
      });
    },

    // format显示的标签
    formatTags(data, chooseName) {
      const { tagsList } = this;
      data.map(item => {
        const index = tagsList.findIndex(
          i =>
            i.userReceivingAddressLabelName ===
            item.userReceivingAddressLabelName
        );
        if (index >= 0) {
          tagsList.splice(index, 1);
        }
      });
      this.tagsList = [...tagsList, ...data];
      const choosedTagIndex = this.data.tagsList.findIndex(
        it => it.userReceivingAddressLabelName === chooseName
      );
      this.choosedTagIndex = choosedTagIndex;
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

      this.userPcds = userPcds;
      this.userConsigneeName = userName;
      this.userConsigneePhone = telNumber;
      this.userAddressDetail = detailInfo;
      this.tenantUserReceivingAddressLabel = {};
      this.userAddressProvince = provinceName;
      this.userAddressCity = cityName;
      this.userAddressDistrict = countyName;
      this.areaValueCh = `${provinceName}/${cityName}/${countyName}`;
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
        width: 24px;
        height: 24px;
        margin-right: 20px;
      }

      .get-wx-adress-text {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .address-content {
    .address-content-detail {
      background: #fff;
      margin-top: 8px;

      .public {
        display: flex;
        align-items: center;
        height: 48px;
        border-bottom: 1px solid #f8f8f8;

        .input-placeholder {
          font-size: 17px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
        }

        input {
          width: 250px;
          font-size: 17px;
          border: none;
        }
      }
      .title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        width: 110px;
        padding-left: 16px;
        box-sizing: border-box;
      }

      .tags-card {
        width: 100%;
        padding-top: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .tags-list {
          width: 265px;
          display: flex;
          flex-wrap: wrap;

          .tag {
            text-align: center;
            padding: 0 15px;
            box-sizing: border-box;
            min-width: 54px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 1);
            border-radius: 12px;
            border: 1px solid rgba(229, 229, 229, 1);
            font-size: 12px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin: 0px 16px 12px 0px;
          }

          .choosed-tag {
            background: #ffe9d9;
            color: #ff6a00;
            border: 1px solid #ff6a00;
          }
        }

        .add-tag-input {
          width: 200px;
          margin-bottom: 12px;
          height: 32px;
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 4px;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
    }
  }

  .footer-btns {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 56px;
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

    .delete-address {
      color: rgba(255, 106, 0, 1);
      background: #fff;
      border-radius: 18px;
      border: 1px solid rgba(255, 106, 0, 1);
      margin-top: 10px;
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
