<template>
  <div class="coupons-list" v-if="list.length">
    <van-list
      offset="50"
      v-model="getLoading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="--"
      @load="onLoad"
      :immediate-check="false"
    >
      <div v-for="item in list" :key="item.userCouponOuterId">
        <coupon-item
          :item="item"
          :invalid="invalid"
          @onChooseCoupon="onChooseCoupon"
          style="width:100%"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
import CouponItem from "@/components/CouponItem";
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    getCouponsList: {
      type: Function
    },
    invalid: {
      type: Number,
      default: 0
    },
    setLoading: {
      type: Function
    }
  },
  components: { CouponItem },
  data() {
    return {};
  },
  computed: {
    getLoading: {
      get: function() {
        return this.loading;
      },
      set: function() {
        this.$emit("setLoading");
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      this.$emit("getCouponsList");
    },
    onChooseCoupon() {}
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
