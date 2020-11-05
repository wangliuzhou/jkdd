<template>
  <div>
    <div class="skill-price">
      <img
        class="skill-price-bg"
        :src="require('@/assets/images/seckill-price-bg.png')"
        alt=""
      />
      <div class="price-wrap">
        <span class="msj">秒杀价</span>
        <span class="sell-price"
          >¥{{
            activityInfo.activityStatus == 3
              ? goodsDetail.minPrice * 1
              : goodsDetail.secKillPrice * 1
          }}</span
        >
        <span
          class="yj-price"
          v-if="activityInfo.activityStatus != 3 && goodsDetail.minPrice * 1"
          >原价<span class="del">¥{{ goodsDetail.minPrice * 1 }}</span></span
        >
      </div>
      <div class="right-info">
        <template v-if="activityInfo.activityStatus == 2">
          <div class="time-title xg" v-if="goodsDetail.saleLimit">
            限购{{ goodsDetail.saleLimit }}件
          </div>
          <div class="time-wrap">
            <div class="jjs">距结束</div>
            <div class="time">
              <span class="item">{{ formatTime[1] }}</span
              ><span>:</span> <span class="item">{{ formatTime[2] }}</span
              ><span>:</span>
              <span class="item">{{ formatTime[3] }}</span>
            </div>
          </div>
        </template>
        <div class="time-title yjs" v-if="activityInfo.activityStatus == 3">
          秒杀已结束
        </div>
      </div>
    </div>
    <div class="goods-info">
      <div class="goods-title">{{ goodsDetail.productName }}</div>
      <div class="goods-desc-wrap">
        <div class="goods-desc" v-if="goodsDetail.sellingPoint">
          {{ goodsDetail.sellingPoint }}
        </div>
      </div>
      <div class="ms-surplus">
        <div class="ms-surplus-progress">
          <div class="ms-surplus-bar">
            <div class="progress">
              <div class="progress-point" :style="progressStyle">
                <IconFont
                  type="iconmiaosha"
                  fontStyle="font-size:0.48rem;color:white;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="ms-surplus-num">剩余{{ leftStock }}件</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { formatNumber } from "@/utils/util.js";

export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageSeckillGoodsDetail.goodsDetail,
      activityInfo: state => state.pageSeckillGoodsDetail.activityInfo
    }),
    formatTime() {
      let { activityInfo } = this;
      if (activityInfo) {
        let { remainingTime } = activityInfo;
        if (remainingTime >= 0) {
          if (remainingTime) {
            let day = parseInt(remainingTime / (60 * 60 * 24 * 1000));
            let hour = parseInt((remainingTime / (60 * 60 * 1000)) % 24);
            let minu = parseInt((remainingTime / (60 * 1000)) % 60);
            let sec = parseInt((remainingTime / 1000) % 60);
            return [day, day * 24 + hour, minu, sec].map(formatNumber);
          }
        }
      }
      return null;
    },
    progressStyle() {
      let { goodsDetail } = this;
      if (goodsDetail) {
        return `width:${((goodsDetail.seckillTotal - goodsDetail.seckillLeft) /
          goodsDetail.seckillTotal) *
          100}%`;
      }
      return null;
    },
    leftStock() {
      let { goodsDetail } = this;
      if (goodsDetail) {
        return goodsDetail.seckillLeft > 10000
          ? ~~(goodsDetail.seckillLeft / 10000) + "w+"
          : goodsDetail.seckillLeft;
      }
      return null;
    }
  }
};
</script>
<style lang="less" scoped>
.skill-price {
  box-sizing: border-box;
  height: 59.5px;
  color: white;
  position: relative;
  .skill-price-bg {
    width: 100%;
    height: 59.5px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .price-wrap {
    padding-left: 12px;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
  }
  .msj {
    font-size: 15px;
    height: 15px;
    line-height: 15px;
  }
  .sell-price {
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    color: white;
    margin-left: 5px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }
  .yj-price {
    height: 16.5px;
    line-height: 16.5px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    font-size: 12px;
    margin-left: 7.5px;
    text-align: center;
    white-space: nowrap;
    padding: 0 4.5px;
    .del {
      text-decoration: line-through;
    }
  }
}
.right-info {
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 0px;
  width: 125px;
  padding-right: 4.5px;
  height: 59.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .time-title {
    font-size: 15px;
    line-height: 21px;
    &.xg {
      text-align: right;
      font-size: 12px;
      line-height: 16.5px;
    }
    &.yjs {
      text-align: right;
      padding-right: 12px;
    }
  }
  .time-wrap {
    display: flex;
    font-size: 12px;
    margin-top: 6px;
    .jjs {
      flex: 0 0 40px;
      line-height: 19px;
    }
    .time {
      top: 17.5px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: nowrap;
      flex: auto;
      span {
        flex: 0 0 13px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item {
        flex: 0 0 19px;
        height: 19px;
        background: white;
        color: #ff6a00;
        border-radius: 5.5px;
      }
    }
  }
}
.goods-info {
  background: white;
  position: relative;
  padding: 13px 12px 16px 12px;
  .zan-wrap {
    position: absolute;
    top: 10px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 21px;
      height: 18.5px;
    }
    span {
      color: #999999;
      font-size: 11px;
      margin-left: 4px;
    }
  }
  .goods-title {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
    line-height: 21px;
    max-height: 42px;
  }
  .goods-desc-wrap {
    margin-top: 6px;
    color: #999;
    font-size: 13px;
    display: flex;
    white-space: nowrap;
    .goods-desc {
      flex: auto;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .sell-count {
      margin-left: 12px;
      white-space: nowrap;
    }
  }
  .ms-surplus {
    display: flex;
    align-items: center;
    margin-top: 11px;
    .ms-surplus-progress {
      flex: auto;
      .ms-surplus-bar {
        width: 100%;
        height: 8px;
        background: #d8d8d8;
        border-radius: 4px;
        position: relative;
        .progress {
          background: #ff6a00;
          height: 100%;
          border-radius: 4px;
          position: relative;
          .progress-point {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateX(50%) translateY(-50%);
            width: 15px;
            height: 15px;
            line-height: 15px;
            border-radius: 100%;
            background: #ff6a00;
            border: 1.5px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .ms-surplus-num {
      flex: 0 0 80px;
      text-align: right;
      color: #ff6a00;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
    }
  }
}
</style>
