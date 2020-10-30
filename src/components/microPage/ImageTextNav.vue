<template>
  <div class="imageTextNav-container-wrap">
    <div class="imageTextNav-container" :style="containerStyle">
      <div class="scroll" :class="{ scrollX: item.pictureType === 2 }">
        <div class="imageTextNav-image" v-if="item.tempType === 1">
          <div
            class="imageTextNav-image-item"
            v-for="item in subEntry"
            :key="item.fId"
            :style="itemStyle"
            @click="handleJump(item)"
          >
            <div
              class="imageTextNav-image-item-image"
              :style="
                item.img_url
                  ? 'background-image:url(' + $ali(item.img_url, 44) + ')'
                  : ''
              "
            ></div>
            <div class="imageTextNav-image-item-text">{{ item.title }}</div>
          </div>
        </div>

        <div class="imageTextNav-text" v-if="item.tempType === 2">
          <div
            class="imageTextNav-text-item"
            v-for="item in subEntry"
            :key="item.fId"
            :style="itemStyle"
            @click="handleJump(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { px2rem } from "@/utils/index";
import jumpLink from "@/utils/jumpLink";

export default {
  props: ["item"],
  computed: {
    subEntry() {
      let { item } = this;
      if (item) {
        return item.sub_entry;
      }
      return [];
    },
    containerStyle() {
      let { item } = this;
      if (item) {
        let { backgroundColor } = item;
        return `background-color: ${backgroundColor}`;
      }
      return "";
    },
    itemStyle() {
      let { item } = this;
      if (item) {
        let { column, pictureType, color } = item;
        return (
          (pictureType === 2
            ? `flex: 0 0 ${px2rem((375 - 24) / column)};`
            : "") + `color:${color};`
        );
      }
      return "";
    }
  },
  methods: {
    handleJump(item) {
      jumpLink(item.link);
    }
  }
};
</script>
<style lang="less" scoped>
.imageTextNav-container-wrap {
  padding: 0 6px;
  .imageTextNav-container {
    background: white;
    border-radius: 0 0 8px 8px;

    .scroll {
      &.scrollX {
        overflow-x: auto;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .imageTextNav-image {
      display: flex;
      flex-wrap: nowrap;
      padding: 12px 6px;
      border-radius: 0 0 8px 8px;
      .imageTextNav-image-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #333;
        .imageTextNav-image-item-image {
          width: 44px;
          height: 44px;
          border-radius: 100%;
          overflow: hidden;
          background-color: #d8d8d8;
          background-size: cover;
          background-position: center center;
        }
        .imageTextNav-image-item-text {
          text-align: center;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          margin-top: 8px;
        }
      }
    }
    .imageTextNav-text {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      height: 42.5px;
      border-radius: 0 0 8px 8px;
      color: #333333;
      .imageTextNav-text-item {
        flex: 1;
        text-align: center;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
    }
  }
}
</style>
