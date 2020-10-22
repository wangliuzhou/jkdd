<template>
  <div class="order-list-wrap">
    <div class="order-list-tabs">
      <div class="order-list-box">
        <div
          v-for="(item, index) in tabs"
          :key="item.name"
          class="order-list-tab"
          :class="{ 'tab-active': activeTabIndex === index }"
          @click="handleTabTap(index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      offset="100"
      @load="getList"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <div v-if="list.length" class="order-list">
        <div class="order-item" v-for="(item, index) in list" :key="index">
          <div class="order-no" @click="handleGoDetail(item.orderOuterId)">
            订单编号：{{ item.orderOuterId }}
            <span class="order-status">{{ item.orderStatusCh }}</span>
          </div>
          <div class="goods-list" @click="handleGoDetail(item.orderOuterId)">
            <div
              v-for="it in item.tenantOrderProdctDetails"
              :key="it.orderProdctDetailId"
            >
              <div class="goods-item">
                <div class="goods-img">
                  <img :src="$ali(it.productSkuThumb, 80)" alt />
                </div>
                <div class="goods-info">
                  <div class="goods-title">{{ it.productName }}</div>
                  <div class="goods-desc">{{ it.productSkuAttr }}</div>
                  <div class="goods-price">¥{{ it.productTotalPrice }}</div>
                </div>
                <div class="goods-number">x{{ it.productCount }}</div>
              </div>
            </div>
          </div>
          <div class="order-price">
            已付金额：
            <span class="price">¥ {{ item.orderTotalPrice }}</span>
          </div>
          <div class="order-btns">
            <button class="ckwl" v-if="item.orderStatus === 0">取消订单</button>
            <button class="ycsh" v-if="item.orderStatus === 0">立即付款</button>
          </div>
        </div>
      </div>
    </van-list>
    <div v-if="showNoOrderImg" class="no-order-wrap">
      <img
        class="no-order-img"
        :src="require('@/assets/images/empty-oreder.png')"
        mode="widthFix"
        alt=""
      />
      <span>暂无订单</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastChoosedStatusType: "",
      loading: false,
      finished: false,
      error: false,
      tabsList: [
        { name: "全部", id: "" },
        { name: "待付款", id: "0" },
        { name: "待发货", id: "1" },
        { name: "部分发货", id: "2" },
        { name: "待收货", id: "3" },
        { name: "交易完成", id: "4" },
        { name: "交易关闭", id: "5" },
        { name: "待评价", id: "100" }
      ],
      activeTabIndex: 0,
      list: [],
      showNoOrderImg: false,
      currentPage: 1,
      tabs: [
        // 后台id 要字符串类型
        { name: "全部", id: "" },
        { name: "待付款", id: "0" },
        { name: "待发货", id: "1" },
        { name: "待收货", id: "3" },
        { name: "待评价", id: "100" },
        { name: "售后", id: "4" }
      ]
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    /**
     * 请求列表数据
     * @param {*} 点击tab触发请求,type=1
     * @param {*} 下拉触底触发请求,type=undefined
     */
    getList(type) {
      const api = "/order/mobile/tenantOrder/findOrderPageMiniProgram";
      const { tabs, currentPage, activeTabIndex } = this;
      const statusType = tabs[activeTabIndex].id;
      this.loading = true;
      this.$fetchGet(api, { statusType, currentPage })
        .then(({ data: { pages, records } }) => {
          // 解决频繁切换tabs，响应次序不对问题
          if (this.lastChoosedStatusType === statusType) {
            // 在这里把list置空，而不是点击tab时置空，
            // 是为了让页面在请求时间内不变成空白
            if (type === 1) {
              this.list = [];
              this.setFetchList(pages, records);
            } else {
              this.setFetchList(pages, records);
            }
          }
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },

    // 设置请求到数据
    setFetchList(pages, records) {
      this.list = this.formatData(records);
      this.loading = false;
      this.showNoOrderImg = this.list.length === 0 ? true : false;
      if (pages <= this.currentPage) {
        this.finished = true;
      }
      this.currentPage += 1;
    },

    // 点击tab标签
    handleTabTap(index) {
      index = Number(index);
      if (index !== this.activeTabIndex) {
        this.activeTabIndex = index;
        this.currentPage = 1;
        this.finished = false;
        this.loading = false;
        // this.list = [];
        this.getList(1);
      }
    },

    // 初始化判断是否有状态代进页面，触发请求
    init() {
      const { activeIndex } = this.$route.query;
      if (activeIndex != undefined) {
        this.activeTabIndex = Number(activeIndex);
      }
      this.getList();
    },

    // 格式化出参数据
    formatData(records) {
      const { list, tabsList } = this;
      const addedList = records.map(item => {
        // 中文状态
        const arr = tabsList.filter(i => i.id === "" + item.orderStatus);
        if (arr.length > 0) return { ...item, orderStatusCh: arr[0].name };
        return item;
      });
      return list.concat(addedList);
    },

    // 点击跳转到详情页
    handleGoDetail(id) {
      this.$push({ path: "/orderDetial", query: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.order-list-wrap {
  position: relative;
  .order-list-tabs {
    width: 100%;
    overflow-x: auto;
    border-radius: 0 0 8px 8px;
    margin-bottom: 10px;
    background: #fff;
    position: sticky;
    top: 0px;
    z-index: 2;
    .order-list-box {
      display: flex;
      align-items: center;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
      height: 51px;
      width: 112%;
      .order-list-tab {
        font-size: 15px;
        text-align: center;
        margin: 0 15px;
      }
      .tab-active {
        color: #ff6a00;
        position: relative;

        &::after {
          content: "";
          width: 20px;
          height: 4px;
          background: #ff6a00;
          border-radius: 2px;
          position: absolute;
          left: 50%;
          bottom: -70%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .order-list {
    height: calc(100vh - 140rpx);
    width: 100%;
    overflow: hidden;

    .order-item {
      background: white;
      margin-bottom: 8px;

      .order-no {
        padding-left: 15px;
        height: 46px;
        line-height: 46rpx;
        color: #999;
        position: relative;
        font-size: 15px;
        margin-bottom: 1px;

        .order-status {
          position: absolute;
          color: #ff6a00;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .goods-list {
        .goods-item {
          padding: 10px 14px;
          display: flex;
          position: relative;
          border-bottom: 1px solid #eee;

          .goods-img {
            flex: 0 0 80px;
            height: 80px;
            background: #f0f0f0;
            border-radius: 8px;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .goods-info {
            margin-left: 12px;
            padding-top: 5px;
            position: relative;

            .goods-title {
              font-size: 15px;
              line-height: 1;
              width: 225px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .goods-desc {
              margin-top: 10px;
              font-size: 13px;
              line-height: 1;
              color: #999999;
              width: 225px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .goods-price {
              font-size: 15px;
              line-height: 20px;
              position: absolute;
              left: 0;
              bottom: 0;
              color: #666666;
            }
          }

          .goods-number {
            color: #999;
            font-size: 12px;
            position: absolute;
            right: 12px;
            top: 14px;
            line-height: 20px;
          }
        }
      }

      .order-price {
        height: 34px;
        line-height: 34px;
        font-size: 13px;
        color: #666666;
        text-align: right;
        padding-right: 15px;

        .price {
          color: #333;
        }
      }

      .order-btns {
        padding-top: 4px;
        padding-bottom: 7px;
        display: flex;
        justify-content: flex-end;
        background: white;
        padding-bottom: 7px;

        button {
          flex: 0 0 80px;
          height: 28px;
          line-height: 28px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #cccccc;
          padding: 0;
          margin: 0;
          font-size: 13px;
          color: #999999;
          margin-right: 12px;

          &:after {
            border: none;
          }

          &.ycsh {
            border: 1px solid #ff6a00;
            color: #ff6a00;
          }
        }
      }
    }
  }

  .no-order-wrap {
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: rgba(102, 102, 102, 1);

    .no-order-img {
      width: 100px;
      height: 135px;
      margin-bottom: 20px;
    }
  }
}
</style>
