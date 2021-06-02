<template>
  <div class="add-complaint-page">
    <header-nav title="我要投诉">
      <template v-slot:right>
        <van-button plain type="info" class="subscribe" size="small">订阅</van-button>
      </template>
    </header-nav>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="name"
        label="姓名"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="mobile"
        type="number"
        name="mobile"
        label="手机号"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        readonly
        clickable
        name="area"
        :value="area"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>

      <van-field
        v-model="toUser"
        name="toUser"
        label="投诉对象"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入投诉对象' }]"
      />
      <van-field
        v-model="title"
        name="title"
        label="标题"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入标题' }]"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="投诉内容"
        type="textarea"
        maxlength="500"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-field name="uploader" label="投诉凭证">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <van-field name="radio" label="是否公开">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">公开</van-radio>
            <van-radio name="2">不公开</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="sms"
        name="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendSMS">发送验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import HeaderNav from "@/components/HeaderNav";
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
export default {
  props: {
    storesysId: String,
    redirectUrl: String,
    bindPhone: Boolean,
    openidStr: String
  },
  components: {
    HeaderNav
  },
  data() {
    return {
      areaList,
      username: "",
      password: "",
      toUser: "",
      message: "",
      area: "",
      showArea: false,
      uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
      sms: "",
      radio: "1",
      mobile: "",
      title: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit==", values);
    },
    onConfirm(values) {
      this.area = values
        .filter(item => !!item)
        .map(item => item.name)
        .join("/");
      this.showArea = false;
    },
    sendSMS(e) {
      e.preventDefault();
      if (!this.mobile) {
        Toast("请先输入手机号");
      }
    }
  },
  computed: {
    needWechatLogin() {
      return true;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.add-complaint-page {
  height: 100vh;
  background: white;
}
.subscribe {
  border-radius: 8px;
}
</style>
