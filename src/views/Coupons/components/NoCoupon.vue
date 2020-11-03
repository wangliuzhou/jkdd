<template>
  <div v-if="list.length === 0 && !loading" class="no-data-box">
    <img class="no-coupon" src="~@/assets/images/no-coupon.png" />
    <div>暂无优惠券哦~</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
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
/* @import url(); 引入css类 */
.no-data-box {
  text-align: center;
  padding-top: 40vh;
  color: #ccc;
  .no-coupon {
    width: 97px;
  }
}
</style>
