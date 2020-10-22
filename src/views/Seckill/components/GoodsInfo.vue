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
        <span class="sell-price">¥{{ goodsDetail.minPrice }}</span>
        <span class="yj-price"
          >原价<span class="del">¥{{ goodsDetail.minPrice }}</span></span
        >
        <div class="time">
          <span class="item">05</span><span>:</span> <span class="item">53</span
          ><span>:</span>
          <span class="item">39</span>
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
            <div class="progress"></div>
            <div class="progress-point">
              <IconFont
                type="iconmiaosha"
                fontStyle="font-size:0.48rem;color:white;"
              />
            </div>
          </div>
        </div>
        <div class="ms-surplus-num">剩余336件</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageGoodsDetail.goodsDetail
    })
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
    height: 41px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
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
  .time {
    position: absolute;
    top: 17.5px;
    right: 0;
    display: flex;
    width: 125px;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
    font-size: 18px;
    span {
      flex: 0 0 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item {
      flex: 0 0 27px;
      height: 27px;
      background: white;
      color: #ff6a00;
      border-radius: 8px;
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
    font-size: 15px;
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
          width: 50%;
          height: 100%;
          border-radius: 4px;
        }
        .progress-point {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
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
    .ms-surplus-num {
      flex: 0 0 65px;
      text-align: right;
      color: #ff6a00;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
    }
  }
}
</style>
