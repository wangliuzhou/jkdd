<template>
  <div class="progress-wrap">
    <div class="progress-total">
      <div class="progress-current" :style="{ width: progressValue }"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    total: {
      type: Number,
      defalut: 100
    },
    current: {
      type: Number,
      defalut: 0
    },
    isFull: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {};
  },
  computed: {
    progressValue() {
      if (this.isFull) {
        return "100%";
      }
      if (this.total === 0 || this.current === 0) {
        return 0;
      }
      if (this.current >= this.total) {
        return "100%";
      }
      return (this.current / this.total) * 100 + "%";
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.progress-wrap {
  width: 100%;

  .progress-total {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    position: relative;

    .progress-current {
      background: #ffffff;
      width: 0%;
      height: 100%;
      border-radius: 6px;
    }
  }
}
</style>
