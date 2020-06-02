<template>
  <div>
    <div class="title">wxless内容</div>
    <textarea v-model="rpx"></textarea>
    <div class="title">结果</div>
    <textarea v-model="px"></textarea>
    <button @click="convert">转换</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rpx: "",
      px: ""
    };
  },
  methods: {
    convert() {
      let { rpx } = this;
      this.px = rpx.replace(/([0-9\\.]+)rpx/g, (a, b) => {
        return parseFloat((b / 2).toFixed(5)) + "px";
      });
      console.log(this.px);
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 16px;
}
textarea {
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  height: 300px;
}
button {
  position: fixed;
  right: 10px;
  top: 10px;
  background: red;
  border: none;
  color: white;
  padding: 10px 15px;
  outline: none;
  border-radius: 3px;
}
</style>
