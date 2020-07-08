<template>
  <div class="goods-imgs">
    <van-swipe :autoplay="autoplay" @change="handleChange">
      <van-swipe-item v-for="(item, i) in imgs" :key="i">
        <div class="img" :style="{ backgroundImage: `url(${item})` }"></div>
      </van-swipe-item>
      <template #indicator v-if="imgs && imgs.length">
        <div class="indicator">
          <span class="active-index">{{ current + 1 }}</span
          >/{{ imgs.length }}
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      current: 0,
      autoplay: 4000
    };
  },
  computed: {
    ...mapState({
      goodsDetail: state => state.pageGoodsDetail.goodsDetail
    }),
    imgs() {
      let {
        goodsDetail: { mainCover }
      } = this;
      return mainCover ? mainCover.split(",") : [];
    }
  },
  methods: {
    handleChange(index) {
      this.current = index;
    }
  }
};
</script>
<style lang="less" scoped>
.goods-imgs {
  height: 375px;
  background: #f2f2f2;
  position: relative;
  & /deep/ .van-swipe {
    height: 100%;
    .van-swipe-item {
      height: 100%;
      .img {
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
    }
  }
  .indicator {
    position: absolute;
    right: 8px;
    bottom: 10px;
    height: 28px;
    line-height: 28px;
    background: rgba(0, 0, 0, 0.3);
    font-size: 12px;
    text-align: center;
    padding: 0 9px;
    color: white;
    border-radius: 14px;
    .active-index {
      font-size: 18px;
    }
  }
}
</style>
