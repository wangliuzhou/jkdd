<template>
  <van-overlay :show="showAddTagInput" @click="toogleAddstatus">
    <div class="wrapper" @click.stop>
      <div class="block">
        <van-field
          v-model="inputValue"
          :formatter="formatter"
          placeholder="请输入"
        />
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: { showAddTagInput: Boolean, tapAddTagBtn: Function },
  components: {},
  data() {
    return { inputValue: "" };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toogleAddstatus() {
      this.$emit("tapAddTagBtn");
    },
    formatter(value) {
      // 过滤输入的数字
      return value.replace(/\d/g, "");
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.wrapper {
  z-index: 5;
  position: fixed;
  text-align: center;
  .van-field {
    width: 240px;
  }
}
</style>
