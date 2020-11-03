<template>
  <div class="loading-box" v-if="loading">
    <van-loading size="24px" vertical type="spinner" color="#ff6a00"
      >加载中...</van-loading
    >
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.loading-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%;-50%);
}
</style>
