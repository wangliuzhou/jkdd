<template>
  <div class="page-classify">
    <div class="classify-search">
      <div class="classify-search-left">
        <div class="classify-search-icon-wrap">
          <IconFont type="iconsousuo" fontStyle="font-size:0.34rem;" />
        </div>
        <div class="classify-search-input-wrap">
          <input type="text" placeholder="搜索词" />
        </div>
      </div>
    </div>

    <div class="classify-content">
      <div class="classify-content-left">
        <div class="classify-content-left-list">
          <div
            :id="`tab_${item.pageCateId}`"
            class="classify-content-left-item"
            :class="{
              active: activeIndex === index,
              preActive: activeIndex - 1 === index,
              nextActive: activeIndex + 1 === index
            }"
            v-for="(item, index) in list"
            :key="item.pageCateId"
            @click="setActiveIndex(item, index)"
          >
            <span>{{ item.pageCateName }}</span>
          </div>
        </div>
      </div>
      <div class="classify-content-right">
        <!-- <div class="classify-content-right-content">
          <div class="classify-content-right-goods-wrap">
            <div
              id="goods_{{ item.pageCateId }}"
              class="classify-content-right-goods"
              wx:for="{{ list }}"
              wx:key="pageCateId"
            >
              <div
                class="classify-content-right-banner"
                wx:if="{{ item.pageCateTitlePic }}"
                style="{{ 'background-image: url(' + item.pageCateTitlePic + ')' }}"
              ></div>
              <div class="classify-content-right-goods-title">
                {{ item.pageCateName }}
              </div>
              <div class="classify-content-right-goods-list">
                <div
                  class="classify-content-right-goods-item"
                  wx:for="{{ item.tenantPageCateSons }}"
                  wx:key="pageCateId"
                >
                  <div
                    class="classify-content-right-goods-item-image"
                    style="{{ 'background-image: url(' + item.pageCateTitlePic + ')' }}"
                  ></div>
                  <div class="classify-content-right-goods-item-name">
                    {{ item.pageCateName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <Tabbar />
  </div>
</template>
<script>
import IconFont from "@/components/IconFont";
import Tabbar from "@/components/Tabbar";
export default {
  components: {
    IconFont,
    Tabbar
  },
  data() {
    return {
      activeIndex: 0,
      list: [],
      rightScrollIntoViewId: null,
      leftScrollTop: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$get("/store/mobile/tenantPage/findSysPage?sysType=3").then(
        ({ data: list }) => {
          this.list = list;
        }
      );
    },
    setActiveIndex(item, index) {
      this.activeIndex = index;
      //做个标记防止重复触发handleRightScroll
      // this.scrolling = true;
      // setTimeout(() => {
      //   this.scrolling = false;
      // }, 400);
    }
  }
};
</script>
<style lang="less" scoped>
.page-classify {
  padding-top: 16px;
  height: 100vh;
  box-sizing: border-box;
}
.classify-search {
  display: flex;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 18px;
  height: 36px;
  line-height: 36px;
  margin: 0 12px;
  margin-bottom: 16px;
  box-sizing: border-box;
  .classify-search-left {
    flex: auto;
    display: flex;
    align-items: center;
    .classify-search-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 34px;
      color: #c0c4cc;
    }
    .classify-search-input-wrap {
      input {
        height: 30px;
        line-height: 30px;
        padding: 0;
        margin: 0;
        border: 0;
        font-size: 14px;
      }
    }
  }
  .classify-search-right {
    flex: 0 0 52px;
    button {
      height: 50px;
      line-height: 50px;
      font-size: 13px;
      color: #303133;
      padding: 0;
      background: none;
      border: none;
    }
  }
}

.classify-content {
  display: flex;
  height: calc(100vh - 50px - 68px);
  .classify-content-left {
    background: white;
    height: 100%;
    flex: 0 0 105px;
    .classify-content-left-list {
      text-align: center;
      .classify-content-left-item {
        background: #f5f5f5;
        height: 50px;
        line-height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          flex: 1;
          color: #666666;
        }
        &.active {
          background: white;
          span {
            color: #333333;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 4px;
              height: 20px;
              background: rgba(255, 106, 0, 1);
              border-radius: 2px;
            }
          }
          // &::after,
          // &::before {
          //   content: "";
          //   position: absolute;
          //   width: 100%;
          //   height: 8px;
          //   left: 0;
          // }
          // &::before {
          //   top: -8px;
          //   border-radius: 0 0 8px 0;
          // }
          // &::after {
          //   bottom: -8px;
          //   border-radius: 0 8px 0 0;
          // }
        }
        &.preActive {
          border-radius: 0 0 8px 0;
        }
        &.nextActive {
          border-radius: 0 8px 0 0;
        }
      }
    }
  }
  .classify-content-right {
    box-sizing: border-box;
    height: 100%;
    flex: auto;
    background: white;
    .classify-content-right-content {
      padding: 8px 10px;
      .classify-content-right-goods-wrap {
        .classify-content-right-banner {
          width: 250px;
          height: 100px;
          border-radius: 8px;
          background: #f5f5f5;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          margin-bottom: 27px;
        }
        .classify-content-right-goods {
          .classify-content-right-goods-title {
            color: #333;
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 21px;
          }
          .classify-content-right-goods-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 8px;
            .classify-content-right-goods-item {
              width: 76.5px;
              margin-right: 10px;
              margin-bottom: 11.5px;
              &:nth-child(3n) {
                margin-right: 0;
              }
              .classify-content-right-goods-item-image {
                width: 76.5px;
                height: 76.5px;
                background: #f5f5f5;
                border-radius: 8px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
              }
              .classify-content-right-goods-item-name {
                color: #333;
                font-size: 13px;
                text-align: center;
                height: 18.5px;
                line-height: 18.5px;
                margin-top: 3.5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
