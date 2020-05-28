<template>
  <div class="business-card">
    <div>
      <label class="card-item card-item-img" @click="uploadAvatar">
        <div class="card-item-title">头像</div>
        <div class="card-item-content">
          <div
            class="img"
            :style="
              salesmanInfo.avatar
                ? {
                    'background-image': `url(${ali(salesmanInfo.avatar, 120)})`
                  }
                : {}
            "
          ></div>
        </div>
      </label>
    </div>
    <div>
      <label
        class="card-item card-item-img card-item-wxqrcode"
        @click="uploadQr"
      >
        <div class="card-item-title">微信二维码</div>
        <div class="card-item-content">
          <div v-if="!salesmanInfo.qr" class="upload-btn"></div>
          <div
            v-else
            class="img"
            :style="{
              'background-image': `url(${ali(salesmanInfo.qr, 120)})`
            }"
          >
            <span
              class="del-btn"
              @click.stop.prevent="salesmanInfo.qr = ''"
            ></span>
          </div>
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="salesmanName">
        <div class="card-item-title">姓名</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.salesmanName"
            placeholder="请输入姓名"
            maxlength="80"
            id="salesmanName"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="phone">
        <div class="card-item-title">手机号码</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.phone"
            placeholder="请输入手机号码"
            maxlength="11"
            id="phone"
          />
        </div>
      </label>
    </div>
    <div class="card-item card-item-zdyhb">
      <div class="card-item-title">
        自定义海报<span>（最多可加10张）</span>
        <div class="switch-btn">
          <van-switch
            v-model="salesmanInfo.isDisplayPoster"
            active-color="#FF6A00"
            inactive-color="#ffffff"
            :active-value="1"
            :inactive-value="0"
          />
        </div>
      </div>
      <div v-if="salesmanInfo.isDisplayPoster == 1" class="card-item-content">
        <div
          v-if="salesmanInfo.posterList && salesmanInfo.posterList.length > 0"
          class="imgs"
        >
          <div
            class="img"
            v-for="(item, i) in salesmanInfo.posterList"
            :key="item.posterUrl"
          >
            <img :src="ali(item.posterUrl)" />
            <span
              class="del-btn"
              @click.stop.prevent="handleDelPosterList(i)"
            ></span>
          </div>
        </div>
        <div
          v-if="salesmanInfo.posterList.length < maxPosterListLen"
          class="upload-btn"
          @click="uploadPosterList"
        ></div>
      </div>
    </div>
    <div>
      <label class="card-item card-item-input" for="company">
        <div class="card-item-title">公司</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.company"
            placeholder="请输入公司（选填）"
            maxlength="100"
            id="company"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="position">
        <div class="card-item-title">职位</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.position"
            placeholder="请输入职位（选填）"
            maxlength="20"
            id="position"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="fixedPhone">
        <div class="card-item-title">座机</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.fixedPhone"
            placeholder="请输入座机（选填）"
            maxlength="25"
            id="fixedPhone"
          />
        </div>
      </label>
    </div>
    <!-- <div>
      <label class="card-item card-item-input" for="wechatNumber">
        <div class="card-item-title">微信号</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.wechatNumber"
            placeholder="请输入微信号（选填）"
            maxlength="30"
            id="wechatNumber"
          />
        </div>
      </label>
    </div> -->
    <div>
      <label class="card-item card-item-input" for="qqNumber">
        <div class="card-item-title">QQ号</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.qqNumber"
            placeholder="请输入QQ号（选填）"
            maxlength="15"
            id="qqNumber"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="email">
        <div class="card-item-title">邮箱</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.email"
            placeholder="请输入邮箱（选填）"
            maxlength="40"
            id="email"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="address">
        <div class="card-item-title">地址</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.address"
            placeholder="请输入地址（选填）"
            maxlength="120"
            id="address"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-input" for="site">
        <div class="card-item-title">网址</div>
        <div class="card-item-content">
          <input
            v-model="salesmanInfo.site"
            placeholder="请输入网址（选填）"
            maxlength="120"
            id="site"
          />
        </div>
      </label>
    </div>
    <div>
      <label class="card-item card-item-grjj" id="intro">
        <div class="card-item-title">个人简介</div>
        <div class="card-item-content">
          <textarea
            v-model="salesmanInfo.intro"
            placeholder="请输入不少于10个字的个人简介"
            maxlength="240"
            id="intro"
          ></textarea>
          <div class="textarea-num">
            {{ (salesmanInfo.intro || "").length }}<span>/240</span>
          </div>
        </div>
      </label>
    </div>

    <div class="bottom-btn">
      <div class="bottom-btn-fixed">
        <button @click="handleUpdate">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import Hashids from "hashids";
import { Toast } from "vant";
import { dataURItoBlob } from "@/utils/index";
import shareMixin from "@/mixins/share";
import { OssDomain } from "@/constant/index";
import { ali } from "@/utils/image";

const chooseImage = ({ count }) => {
  return new Promise(resolve => {
    wx.chooseImage({
      count, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        resolve(res);
      },
      error: err => {
        console.log(err);
      }
    });
  });
};

const getLocalImgData = localId => {
  return new Promise(resolve => {
    wx.getLocalImgData({
      localId,
      success: res => {
        let { localData } = res;
        if (localData.indexOf("data:image") !== 0) {
          localData = "data:image/jpeg;base64," + localData;
        }
        localData = localData
          .replace(/\r|\n/g, "")
          .replace("data:image/jgp", "data:image/jpeg");
        resolve({ ...res, localData });
      }
    });
  });
};

export default {
  mixins: [shareMixin],
  data() {
    return {
      maxPosterListLen: 10,
      salesmanInfo: {
        id: "",
        avatar: "",
        qr: "",
        salesmanName: "",
        phone: "",
        isDisplayPoster: 0,
        posterList: [],
        company: "",
        position: "",
        fixedPhone: "",
        wechatNumber: "",
        qqNumber: "",
        email: "",
        address: "",
        site: "",
        intro: ""
      }
    };
  },
  mounted() {
    this.setWxShare({
      hideShareMenu: true
    });
    this.loadData();
  },
  methods: {
    ...mapMutations({
      setLoading: "global/setLoading"
    }),
    ali,
    loadData() {
      this.setLoading(true);
      this.$post("/salesmanInfo/findSalesmanInfoById").then(({ data }) => {
        if (data) {
          let { salesmanInfo, posterList } = data;
          this.salesmanInfo = Object.assign({}, this.salesmanInfo, {
            ...salesmanInfo,
            posterList
          });
        }
        this.setLoading(false);
      });
    },
    //上传头像
    async uploadAvatar() {
      const imgs = await this.chooseImage();
      this.salesmanInfo.avatar = imgs[0];
    },
    //上传二维码
    async uploadQr() {
      const imgs = await this.chooseImage();
      this.salesmanInfo.qr = imgs[0];
    },
    //上传海报
    async uploadPosterList() {
      let count = this.maxPosterListLen - this.salesmanInfo.posterList.length;
      const imgs = await this.chooseImage({
        count: count > 9 ? 9 : count < 0 ? 0 : count
      });
      this.salesmanInfo.posterList = this.salesmanInfo.posterList.concat(
        imgs.map(img => {
          return { posterUrl: img };
        })
      );
    },
    //获取上传凭证
    async getPolicy() {
      const { data } = await this.$get("/oss/direct/getPolicy", {
        storesysId: -1
      });
      return data;
    },
    //选择并上传图片
    async chooseImage({ count = 1 } = {}) {
      const { localIds } = await chooseImage({ count });
      this.setLoading(true);
      const localDatas = [];
      for (let i = 0, len = localIds.length; i < len; i++) {
        const { localData } = await getLocalImgData(localIds[i]);
        localDatas.push(localData);
      }
      const policyInfo = await this.getPolicy();
      const imgs = await this.uploadImgsToOss({ policyInfo, localDatas });
      this.setLoading(false);
      return imgs;
    },
    //上传图片到oss
    uploadImgsToOss({
      policyInfo: { host, dir, accessid, policy, signature, callback },
      localDatas
    }) {
      let hashids = new Hashids(
        "xz-aliyunoss-upload",
        0,
        "abcdefghijklmnopqrstuvwxyz1234567890"
      );
      let requests = localDatas.map(localData => {
        let fd = new FormData();
        let key = `${dir}${"file_" +
          hashids.encode(
            Date.now() + (Math.random() * (999 - 100) + 100).toFixed(0)
          )}`;
        fd.append("key", key);
        fd.append("OSSAccessKeyId", accessid);
        fd.append("policy", policy);
        fd.append("Signature", signature);
        fd.append("success_action_status", 200);
        fd.append("callback", callback);
        fd.append("file", dataURItoBlob(localData));
        return this.$axios
          .post(host, fd, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {
            return `${OssDomain}/${key}`;
          });
      });
      return this.$multiple(requests, (...imgs) => {
        return imgs;
      });
    },
    handleDelPosterList(index) {
      this.salesmanInfo.posterList = this.salesmanInfo.posterList.filter(
        (item, i) => {
          return index !== i;
        }
      );
    },
    handleUpdate() {
      let {
        posterList,
        id,
        avatar,
        qr,
        salesmanName,
        phone,
        company,
        isDisplayPoster,
        position,
        fixedPhone,
        wechatNumber,
        qqNumber,
        email,
        address,
        site,
        intro
      } = this.salesmanInfo;

      if (!avatar) {
        return Toast({ position: "bottom", message: "请上传头像～" });
      } else if (!salesmanName) {
        return Toast({ position: "bottom", message: "请输入姓名～" });
      }

      this.setLoading(true);

      this.$post("/salesmanInfo/updateSalesmanInfo", {
        salesmanInfo: {
          id,
          avatar,
          qr,
          salesmanName,
          phone,
          company,
          isDisplayPoster,
          position,
          fixedPhone,
          wechatNumber,
          qqNumber,
          email,
          address,
          site,
          intro
        },
        posterList
      }).then(() => {
        Toast({ position: "bottom", message: "修改成功～" });
        this.setLoading(false);
        this.$router.back();
      });
    }
  }
};
</script>
<style lang="less" scoped>
input,
textarea {
  &::-webkit-input-placeholder {
    color: #ccc;
  }
}
label {
  display: block;
}
.business-card {
  font-family: PingFangSC-Regular, PingFang SC;
  background: #f5f5f5;
  .card-item {
    background: white;
    font-size: 17px;
    margin-top: 5px;
    &.card-item-input {
      padding: 12px;
      display: flex;
      align-items: center;
      .card-item-title {
        flex: 0 0 86.5px;
        color: #333;
      }
      .card-item-content {
        flex: auto;
        margin-left: 12px;
        input {
          display: block;
          width: 100%;
          height: 24px;
          line-height: 24px;
          font-size: 17px;
          padding: 0;
          outline: none;
          border: none;
        }
      }
    }
    &.card-item-img {
      padding: 5px 12px;
      display: flex;
      align-items: center;
      .card-item-title {
        line-height: 24px;
        flex: auto;
      }
      .card-item-content {
        flex: 0 0 60px;
        .upload-btn {
          width: 60px;
          height: 60px;
          background: #f5f5f5;
          position: relative;
          &:before,
          &:after {
            content: "";
            position: absolute;
            background: #ff6a00;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          &:before {
            width: 19px;
            height: 2px;
          }
          &:after {
            width: 2px;
            height: 19px;
          }
        }
        .img {
          width: 60px;
          height: 60px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          position: relative;
          .del-btn {
            position: absolute;
            top: -6px;
            right: -6px;
            background: red;
            width: 18px;
            height: 18px;
            background: url(../assets/close.png) no-repeat center center;
            background-size: 100%;
            opacity: 0.5;
          }
        }
      }
    }
    &.card-item-grjj {
      .card-item-title {
        height: 48px;
        line-height: 48px;
        padding-left: 12px;
        border-bottom: 1px solid #eeeeee;
      }
      .card-item-content {
        padding: 12px;
        textarea {
          width: 100%;
          height: 64px;
          line-height: 20px;
          outline: none;
          border: none;
          padding: 0;
          box-sizing: border-box;
          font-size: 17px;
        }
        .textarea-num {
          text-align: right;
          line-height: 24px;
          color: #303133;
          span {
            color: #999;
          }
        }
      }
    }
    &.card-item-zdyhb {
      .card-item-title {
        height: 48px;
        line-height: 48px;
        padding-left: 12px;
        position: relative;
        span {
          color: #909399;
        }
        .switch-btn {
          display: flex;
          justify-items: center;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          & /deep/ .van-switch {
            border: 2px solid #e5e5e5;
          }
        }
      }
      .card-item-content {
        padding: 10px;
        background: #f5f5f5;
        .imgs {
          .img {
            position: relative;
            img {
              display: block;
              width: 100%;
            }
            .del-btn {
              position: absolute;
              top: -6px;
              right: -6px;
              background: red;
              width: 18px;
              height: 18px;
              background: url(../assets/close.png) no-repeat center center;
              background-size: 100%;
              opacity: 0.5;
            }
          }
        }
        .upload-btn {
          background: #ffffff;
          height: 155px;
          border: 1px dashed #ff6a00;
          position: relative;
          &:before,
          &:after {
            content: "";
            position: absolute;
            background: #ff6a00;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          &:before {
            width: 19px;
            height: 2px;
          }
          &:after {
            width: 2px;
            height: 19px;
          }
        }
      }
    }
  }
  .bottom-btn {
    height: 104px;
    .bottom-btn-fixed {
      position: fixed;
      left: 0;
      bottom: 0;
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
}
</style>
